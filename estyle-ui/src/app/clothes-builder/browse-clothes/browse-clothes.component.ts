import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription, combineLatest, Observable, of } from 'rxjs';
import {
  map,
  shareReplay,
  distinctUntilChanged,
  debounceTime,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { random } from 'lodash';
import { BrowseClothesService } from './browse-clothes.service';
import { ApiService } from './../../core/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

const CATEGORIES = [
  'Online Shops',
  'Your Wardrobe',
];

const CLOTHES_SIZE = 36;
const LOGOS_SIZE = 5;

export interface ICategory {
  id: number;
  name: string; 
}

export interface IClothe {
  id: number;
  name: string;
  fileName: string;
  logo: string;
  category: number;
  price: number;
}

export interface IClothesCategories {
  id: number;
  name: any;
  logo: string;
}

const formatData = (data) =>
  data.map((x) => ({
    ...x,
    logo: x.pictures[0],
    fileName: x.pictures[0],
  }));

@Component({
  selector: 'app-browse-clothes',
  templateUrl: './browse-clothes.component.html',
  styleUrls: ['./browse-clothes.component.scss'],
})
export class BrowseClothesComponent implements OnInit {
  @Output() currentAuthor: EventEmitter<any> = new EventEmitter<any>();
  categories$: Observable<ICategory[]>;
  clothesStore$: Observable<any[]>;
  clothesCategories$: Observable<IClothesCategories[]>;
  // clothes$: Observable<any[]>; 
  clothes$: any[];
  activeClothesCategory$: BehaviorSubject<any> = new BehaviorSubject(0);
  activeCategory$: BehaviorSubject<any> = new BehaviorSubject(1);
  user: any = [];
  users: FormControl = new FormControl();
  usersList: any;
  nonFormatUserList: any;
  targetId: string = '';
  id: string = '';

  private subscription: Subscription;

  searchControl: FormControl = new FormControl();
  draggable = {
    data: 'myDragData',
    effectAllowed: 'move',
    disable: false,
    handle: false,
  };

  constructor(
    private browseClothesService: BrowseClothesService,
    private api: ApiService,
    private activateRoute: ActivatedRoute,
  ) {
      this.subscription = activateRoute.params.subscribe(
      (params) => (this.id = params['id'])
      );
      
  }

  ngOnInit(): void {
    this.categories$ = this.generateCategories$().pipe(shareReplay(1));
    this.clothesCategories$ = this.generateClothesCategories$().pipe(shareReplay(1));

    this.api.getMe().subscribe((data: any) => (this.user = data));

    this.api.getUser().subscribe((data: any) => {
      this.usersList = data.map((element) => element.email);
      this.nonFormatUserList = data;
      if (this.id) {
        if (this.api.currenUser.type == 'Stylist') {
           this.api.getOutfitById(this.id).subscribe((data: any) => {
               this.users.setValue(data.author.email)
               this.targetId = this.nonFormatUserList.filter(
                (element) => element.email == data.author.email
                )[0].id;
                this.currentAuthor.emit(this.targetId);
                this.api
                .getClothingItems({ limit: 3000, skip: 0, author: this.targetId })
                .subscribe((data: any) => this.clothes$ = formatData(data.data));
               });
           
        }
      }
    });

    this.clothesStore$ = this.generateClothes$().pipe(shareReplay(1));

    this.api.getMyWardrobe().subscribe((data: any) => {
      this.clothesStore$ = formatData(data.data);
      this.clothes$ = formatData(data.data);
    });

    this.activeCategory$.subscribe((data: any) => {
      if (data == 'Online Shops') {
        this.api.getBrandItem({}).subscribe((data: any) => {
              this.clothes$ = formatData(data.data);
            });
      } else {
        this.api
            .getMyWardrobe({ isFavorite: data === 'Your Favorites' })
            .subscribe((data: any) => {
              this.clothes$ = formatData(data.data);
            });
      }
      
    });

    this.activeClothesCategory$.subscribe((data: any) => {
      if (data != 0 && data.name.name != 'all') {
        this.api
        .getMyClothingItems({ limit: 3000, skip: 0, categoryId: data.name.id })
        .subscribe((clothe: any) => this.clothes$ = formatData(clothe.data));
      } else {
        this.api
        .getMyClothingItems({ limit: 3000, skip: 0 })
        .subscribe((clothe: any) => this.clothes$ = formatData(clothe.data));
      }
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((search) => {
        this.api
          .getMyWardrobe({
            isFavorite: this.activeCategory$.value === 'Your Favorites',
            search,
          })
          .subscribe((data: any) => {
            this.clothes$ = formatData(data.data);
          });
      });

    // this.clothes$ = this.searchControl.valueChanges.pipe(
    //   startWith(''),
    //   switchMap(value =>
    //     combineLatest([
    //       this.activeCategory$,
    //       this.clothesStore$
    //     ]).pipe(
    //       map(([activeCategory, clothes]) =>
    //         clothes.filter(c => c.name.toLowerCase().includes(value.toLowerCase()) && c.category === activeCategory)
    //       )
    //     )
    //   )
    // );
  }

  generateCategories$(): Observable<ICategory[]> {
    const categories: ICategory[] = [];

    CATEGORIES.forEach((c, i) =>
      categories.push({
        id: ++i,
        name: c,
      })
    );

    return of(categories);
  }

  generateClothesCategories$(): Observable<IClothesCategories[]> {
      const categories: IClothesCategories[] = [];

      this.api.getCategories().subscribe((data: any) => {
        data.forEach((c, i) =>
          categories.push({
            id: i+=2,
            name: c,
            logo: `./assets/images/mock/clothes/${i+=1}.png`,
          })
        );
      });
      categories.push({
            id: 0,
            name: {
                name: 'all'
            },
            logo: `./assets/images/mock/clothes/29.png`,
          })

      return of(categories);
  }

  generateClothes$(size = 300): Observable<IClothe[]> {
    return this.categories$.pipe(
      map((categories) => {
        const categorySize = categories.length;
        const clothes: IClothe[] = [];

        for (let i = 1; i <= size; i++) {
          const category = categories[random(0, categorySize - 1)];

          clothes.push({
            id: i,
            name: `Clothe ${i}`,
            fileName: `${random(1, CLOTHES_SIZE)}.png`,
            logo: `${random(1, LOGOS_SIZE)}.png`,
            category: category.id,
            price: random(49, 1500),
          });
        }

        return clothes;
      })
    );
  }

  selectCategory(category: any): void {
    this.activeCategory$.next(category.name);
  }

  selectClotheCategory(clothesCategories: any): void {
    this.activeClothesCategory$.next(clothesCategories);
  }

  onDragStart(image, event) {}

  onDraggableCopied(event) {}

  onDraggableLinked(event) {}

  onDraggableMoved(event) {}

  onDragCanceled(event) {}

  onDrop(event) {
    // this.addImage(this.dragTarget);
    // this.dragTarget = null;
    // this.dragEnabled = false;
  }

  onDragEnd(event) {}

  select(clothe: IClothe): void {
    this.browseClothesService.select(clothe);
  }

  unselect(): void {
    this.browseClothesService.unselect();
  }

  getUserItems(event): void {
    this.targetId = this.nonFormatUserList.filter(
      (element) => element.email == event.target.value
    )[0].id;
    this.currentAuthor.emit(this.targetId);
    this.api
      .getClothingItems({ limit: 3000, skip: 0, author: this.targetId })
      .subscribe((data: any) => this.clothes$ = formatData(data.data));
  }
}
