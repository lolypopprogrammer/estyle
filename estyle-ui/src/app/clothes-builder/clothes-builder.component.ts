import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { fabric } from 'fabric';
import { FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import { BehaviorSubject, fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { ToolbarService } from './toolbar/toolbar.service';
import { ClothesBuilderService } from './clothes-builder.service';
import { OperationsService } from './operations/operations.service';
import { environment } from '../../environments/environment';
import { ToolbarBottomService } from './toolbar-bottom/toolbar-bottom.service';
import { ApiService } from './../core/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

const MOVE_STEP = 10;

@Component({
  selector: 'app-clothes-builder',
  templateUrl: './clothes-builder.component.html',
  styleUrls: ['./clothes-builder.component.scss'],
})
export class ClothesBuilderComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvasRef') canvasRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('containerRef') containerRef: ElementRef<HTMLElement>;
  @ViewChild('browseClothesRef') browseClothesRef: ElementRef<HTMLElement>;

  resizeWindow$: BehaviorSubject<any> = new BehaviorSubject(null);

  public VISIBILITY_STATES = ['draft', 'publish', 'private'];

  fabricCanvas: fabric.Canvas;
  selected: any;
  target: any;
  clipboard: any;
  resizing: boolean;
  title: FormControl = new FormControl();
  bodyShape: FormControl = new FormControl();
  personalStyle: FormControl = new FormControl();
  occasion: FormControl = new FormControl();
  collection: FormControl = new FormControl();
  visibilityState: FormControl = new FormControl(this.VISIBILITY_STATES[0]);
  isPublic: boolean = false;
  isLookbook: boolean = false;
  isDraft: boolean = false;
  hiddenOperations: string[];
  id: string;
  isBrand: boolean = false;
  currentUser: string = '';

  private subscription: Subscription;
  private readonly unsubscribe$ = new Subject<void>();
  public bodyShapeList = [];
  public personalStyleList = [];
  public occasionList = [];
  public collectionList = [];
  public shapes;
  public styles;
  public occasions;
  public collections;

  constructor(
    private renderer2: Renderer2,
    private toolbarService: ToolbarService,
    private toolbarBottomService: ToolbarBottomService,
    private operationsService: OperationsService,
    private clothesBuilderService: ClothesBuilderService,
    private api: ApiService,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.subscription = activateRoute.params.subscribe(
      (params) => (this.id = params['id'])
    );
    if (this.id) {
      this.api.getOutfitById(this.id).subscribe((data) => {
        if (data['author']['id'] != this.api.currenUser.id && this.api.currenUser.type != 'Stylist') {
          this.router.navigate([`clothes-builder`]);
        } else {
          this.fabricCanvas.loadFromJSON(data['structure']);
          this.title = new FormControl(data['name']);
        }

        if (data['isPublic']) {
          this.visibilityState.setValue('publish');
        } else if (data['isDraft']) {
          this.visibilityState.setValue('draft');
        } else {
          this.visibilityState.setValue('private');
        }

        if (data['bodyShape']) {
          this.api
            .getBodyShapesById(data['bodyShape'])
            .subscribe((data) => this.bodyShape.setValue(data['name']));
        }

        if (data['personalStyle']) {
          this.api
            .getPersonalStylesById(data['personalStyle'])
            .subscribe((data) => this.personalStyle.setValue(data['name']));
        }

        if (data['occasion']) {
          this.api
            .getOccasionsById(data['occasion'])
            .subscribe((data) => this.occasion.setValue(data['name']));
        }
      });
    }

    this.api.getBodyShapes().subscribe((data: []) => {
      this.bodyShapeList = data.map((element) => element['name']);
      this.shapes = data;
    });

    this.api.getPersonalStyles().subscribe((data: []) => {
      this.personalStyleList = data.map((element) => element['name']);
      this.styles = data;
    });

    this.api.getOccasions().subscribe((data: []) => {
      this.occasionList = data.map((element) => element['name']);
      this.occasions = data;
    });
    this.api.getCollection({ limit: 1000 }).subscribe((data: any) => {
      this.collectionList = data.data.map((element) => element['title']);
      this.collections = data.data;
    });
  }

  ngOnInit(): void {
    this.hiddenOperations = ['draft'];
    this.isBrand = this.api.currenUser.type == 'Brand';
    this.api.getMe().subscribe((data: any) => (this.currentUser = data.id));
    this.resizeWindow$
      .asObservable()
      .pipe(
        filter((e) => !!e),
        debounceTime(250),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((event) => {
        const padding = 16;
        const clientWidth = this.containerRef.nativeElement.clientWidth;
        const clientHeight = this.containerRef.nativeElement.clientHeight;

        this.fabricCanvas.setWidth(clientWidth - padding * 2);
        this.fabricCanvas.setHeight(clientHeight - padding * 2);
        this.resizing = false;

        (document.querySelector(
          '.canvas-container'
        ) as HTMLElement).style.display = 'block';
      });
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.fabricCanvas.clear();
    this.fabricCanvas.dispose();
    this.id = null;
  }

  ngAfterViewInit(): void {
    const padding = 16;
    const clientWidth = this.containerRef.nativeElement.clientWidth;
    const clientHeight = this.containerRef.nativeElement.clientHeight;

    this.renderer2.setProperty(
      this.canvasRef.nativeElement,
      'width',
      clientWidth - padding * 2
    );
    this.renderer2.setProperty(
      this.canvasRef.nativeElement,
      'height',
      clientHeight - padding * 2
    );

    this.createFabricCanvas();

    fromEvent(this.fabricCanvas, 'selection:created')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => this.onSelected(e));

    fromEvent(this.fabricCanvas, 'selection:updated')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => this.onSelected(e));

    fromEvent(this.fabricCanvas, 'selection:cleared')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => this.onUnselected(e));

    this.toolbarService.event$.pipe(filter((e) => !!e)).subscribe((event) => {
      switch (event.action) {
        case 'createText':
          this.createText();
          break;

        case 'rotateRight':
          this.rotateRight();
          break;

        case 'rotateLeft':
          this.rotateLeft();
          break;

        case 'center':
          this.center();
          break;
      }
    });

    this.toolbarBottomService.event$
      .pipe(filter((e) => !!e))
      .subscribe((event) => {
        switch (event.action) {
          case 'duplicate':
            this.duplicate();
            break;

          case 'centerByHorizontal':
            this.centerByHorizontal();
            break;

          case 'centerByVertical':
            this.centerByVertical();
            break;

          case 'moveUp':
            this.moveUp();
            break;

          case 'moveDown':
            this.moveDown();
            break;

          case 'remove':
            this.remove();
            break;
        }
      });

    this.operationsService.event$
      .pipe(filter((e) => !!e))
      .subscribe((event) => {
        switch (event.action) {
          case 'save':
            this.save();
            break;

          case 'publish':
            this.share();
            break;

          case 'clone':
            this.clone();
            break;

          case 'private':
            this.notShare();
            break;

          case 'draft':
            this.draft();
            break;
          case 'patch':
            this.patch();
            break;
        }
      });
  }

  createFabricCanvas(): void {
    this.fabricCanvas = new fabric.Canvas(this.canvasRef.nativeElement, {
      imageSmoothingEnabled: false,
      enableRetinaScaling: false,
      fireRightClick: true,
      stopContextMenu: true,
      backgroundColor: '#fff',
    });
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(event) {
    this.resizing = true;
    (document.querySelector('.canvas-container') as HTMLElement).style.display =
      'none';
    this.resizeWindow$.next(event);
  }

  onDragover(event): void {}

  onDrop(event): void {
    const data = event.data;
    this.addImage(data.fileName, event.event.layerX, event.event.layerY, data);
  }

  addImage(fileName, left, top, clothData?: object): void {
    fabric.Image.fromURL(
      fileName,
      (img) => {
        const maxWidth = this.fabricCanvas.width / 5;
        const maxHeight = this.fabricCanvas.height / 4;
        let scale = 0.2;

        if (img.width > maxWidth) {
          scale = maxWidth / img.width;
        }

        if (img.width < maxWidth && img.height > maxHeight) {
          scale = maxHeight / img.height;
        }

        img
          .set({
            left: left - (img.width * scale) / 2,
            top: top - (img.height * scale) / 2,
          })
          .scale(scale);

        if (clothData) {
          img.clothData = clothData;
        }

        this.fabricCanvas.add(img);
      },
      {
        crossOrigin: 'anonymous',
      }
    );
  }

  getContainingBrands() {
    const items = this.fabricCanvas.getObjects();
    const brands = [];
    items.forEach((item) => {
      const cloth = item.clothData;
      if (
        cloth &&
        cloth.brand &&
        cloth.brand._id &&
        !brands.includes(cloth.brand._id)
      ) {
        brands.push(cloth.brand._id);
      }
    });

    return brands;
  }

  getContainingItems() {
    const items = this.fabricCanvas.getObjects();
    const itemsId = [];
    itemsId['ids'] = [];
    itemsId['tags'] = [];

    items.forEach((item) => {
      const cloth = item.clothData;
      if (cloth && cloth.id && !itemsId['ids'].includes(cloth.id)) {
        itemsId['ids'].push(cloth.id);
      }
      if (cloth && cloth.tags && !itemsId['tags'].includes(cloth.tags)) {
        cloth.tags.forEach((e) => itemsId['tags'].push(e));
      }
    });

    return itemsId;
  }

  remove(): void {
    this.selected.forEach((s) => this.fabricCanvas.remove(s));
  }

  centerByHorizontal(): void {
    this.target.centerH();
  }

  centerByVertical(): void {
    this.target.centerV();
  }

  moveUp(): void {
    const top = this.target.top;
    this.target.top = top - MOVE_STEP;
    this.fabricCanvas.renderAll();
  }

  moveDown(): void {
    const top = this.target.top;
    this.target.top = top + MOVE_STEP;
    this.fabricCanvas.renderAll();
  }

  rotateRight(): void {
    this.target.angle = this.target.angle || 0;
    this.target.rotate(this.target.angle + 90);
    this.fabricCanvas.renderAll();
  }

  rotateLeft(): void {
    this.target.angle = this.target.angle || 0;
    this.target.rotate(this.target.angle - 90);
    this.fabricCanvas.renderAll();
  }

  createText(): void {
    const text = new fabric.IText('New text', {
      angle: 0,
      top: 150,
      left: 150,
    });

    this.fabricCanvas.add(text);
  }

  center(): void {
    this.target.center();
  }

  duplicate(): void {
    this.copy();
  }

  copy(): void {
    this.fabricCanvas.getActiveObject().clone((cloned) => {
      this.clipboard = cloned;
      this.paste();
    });
  }

  paste(): void {
    this.clipboard.clone((clonedObj) => {
      this.fabricCanvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = this.fabricCanvas;
        clonedObj.forEachObject((obj) => {
          this.fabricCanvas.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        this.fabricCanvas.add(clonedObj);
      }
      this.clipboard.top += 10;
      this.clipboard.left += 10;
      this.fabricCanvas.setActiveObject(clonedObj);
      this.fabricCanvas.requestRenderAll();
    });
  }

  unselectAll(): void {
    this.fabricCanvas.discardActiveObject().renderAll();
  }

  setVisibilityState() {
    if (this.visibilityState.value === 'draft') {
      this.draft();
    } else if (this.visibilityState.value === 'publish') {
      this.share();
    } else {
      this.notShare();
    }
  }

  patch(): void {
    this.setVisibilityState();
    this.unselectAll();
    this.resizing = true;
    (document.querySelector('.canvas-container') as HTMLElement).style.display =
      'none';
    try {
      this.canvasRef.nativeElement.toBlob((blob: Blob) => {
        const file = new File(
          [blob],
          `${this.title.value || 'clothe-builder'}.png`,
          { type: 'image/png' }
        );
        const form = new FormData();
        form.append('picture', file);
        form.append('name', this.title.value);
        form.append('isPublic', String(this.isPublic));
        form.append('structure', JSON.stringify(this.fabricCanvas));
        form.append('isLookbook', String(this.isLookbook));
        form.append('isDraft', String(this.isDraft));
        form.append('brands', JSON.stringify(this.getContainingBrands()));
        // form.append('items', JSON.stringify(this.getContainingItems()));

        if (this.bodyShape.value) {
          form.append(
            'bodyShape',
            String(this.shapes.find((x) => x.name === this.bodyShape.value)?.id)
          );
        }
        if (this.personalStyle.value)
          form.append(
            'personalStyle',
            String(
              this.styles.find((x) => x.name === this.personalStyle.value)?.id
            )
          );
        if (this.occasion.value)
          form.append(
            'occasion',
            String(
              this.occasions.find((x) => x.name === this.occasion.value)?.id
            )
          );
        if (this.collection.value)
          form.append(
            'brandCollection',
            String(
              this.collections.find((x) => x.title === this.collection.value)
                ?.id
            )
          );

        this.api.patchOutfit(this.id, form).subscribe((data) => {
          this.toastr.success('Successfully created!', 'Success');
          (document.querySelector(
            '.canvas-container'
          ) as HTMLElement).style.display = 'block';
          this.resizing = false;
        });
      });
    } catch (e) {
      return;
    }
  }

  clone(): void {
    this.save((clonedOutfit) => {
      this.id = clonedOutfit['id'];
    });
  }

  save(onCreate?:Function): void {
    this.setVisibilityState();
    this.unselectAll();

    // this.canvasRef.nativeElement.toBlob((blob: Blob) => {
    //   saveAs(blob, this.title.value || 'clothe-builder');
    // });
    this.resizing = true;
    (document.querySelector('.canvas-container') as HTMLElement).style.display =
      'none';
    try {
      this.canvasRef.nativeElement.toBlob((blob: Blob) => {
         
        const file = new File(
          [blob],
          `${this.title.value || 'clothe-builder'}.png`,
          { type: 'image/png' }
        );

        const form = new FormData();

        form.append('picture', file);
        form.append('name', this.title.value);
        form.append('isPublic', String(this.isPublic));
        form.append('isLookbook', String(this.isLookbook));
        form.append('isDraft', String(this.isDraft));
        form.append('isLookbook', String(this.isLookbook));
        form.append('structure', JSON.stringify(this.fabricCanvas));
        form.append('brands', JSON.stringify(this.getContainingBrands()));
        form.append('items', JSON.stringify(this.getContainingItems()['ids']));
        form.append('tags', JSON.stringify(this.getContainingItems()['tags']));
        
        if (this.bodyShape.value)
          form.append(
            'bodyShape',
            String(this.shapes.find((x) => x.name === this.bodyShape.value)?.id)
          );

        if (this.personalStyle.value)
          form.append(
            'personalStyle',
            String(
              this.styles.find((x) => x.name === this.personalStyle.value)?.id
            )
          );
        if (this.occasion.value)
          form.append(
            'occasion',
            String(
              this.occasions.find((x) => x.name === this.occasion.value)?.id
            )
          );
        if (this.collection.value)
          form.append(
            'brandCollection',
            String(
              this.collections.find((x) => x.title === this.collection.value)
                ?.id
            )
          );
        if (this.currentUser) form.append('author', this.currentUser);

        this.api.createOutfit(form).subscribe({
            next: (data) => {
                this.toastr.success('Successfully created!', 'Success');
                (document.querySelector(
                '.canvas-container'
                ) as HTMLElement).style.display = 'block';
                this.resizing = false;
              onCreate(data);
            },
             error: ({ error }) => {
                this.toastr.error(error.message, 'Error');
            }
        });
      });
    } catch (e) {
      this.toastr.success(e, 'Error');
      return;
    }
  }

  share(): void {
    this.isPublic = true;
    this.isDraft = false;
  }

  draft(): void {
    this.isDraft = true;
    this.isPublic = false;
  }

  notShare() {
    this.isDraft = false;
    this.isLookbook = true;
    this.isPublic = false;
  }

  onSelected(event): void {
    this.target = event.target;
    this.selected = event.selected;
    this.clothesBuilderService.setSelected(this.selected);
  }

  onUnselected(event): void {
    this.selected = null;
    this.clothesBuilderService.setSelected(this.selected);
  }
  changeAuthor(event) {
    if (event != this.currentUser) {
      this.currentUser = event;
      this.fabricCanvas.clear();
      this.resizing = false;
    //   this.createFabricCanvas();
    }
  }
}
