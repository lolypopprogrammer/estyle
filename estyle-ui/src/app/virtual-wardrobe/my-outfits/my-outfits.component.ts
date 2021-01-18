import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ApiService } from '../../core/services/api/api.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import {SearchInApiService} from "../../ui/search-panel/search-in-api.service";

@Component({
  selector: 'app-virtual-wardrobe-my-outfits',
  templateUrl: './my-outfits.component.html',
  styleUrls: ['./my-outfits.component.scss'],
})
export class MyOutfitsComponent implements OnInit {
  data: any = [];
  total: number;
  hasMore: boolean = false;
  isSearching: boolean = false;
  dataPool = [];
  cardsPool = [];
  filtredPool = { occasionId: [], shapeId: [], styleId: [] };

  searchControl: FormControl = new FormControl();
  tabs: any[] = [
    { label: 'My Lookbook', value: 'myLookbook' },
    { label: 'Public', value: 'public' },
  ];
  activeTab = new FormControl('myLookbook');

  private myLookbookFilter = { limit: 3, isLookbook: true, isPublic: false };
  private publicLookbookFilter = {
    limit: 3,
    isPublic: true,
  };
  private currentApiFields: object = this.myLookbookFilter;

  constructor(
    private router: Router,
    private api: ApiService,
    private occasion: SearchInApiService)
  {
    this.occasion.onClick.subscribe((occasion) => {
      if (occasion.hasOwnProperty('occasionId')) {
        if (occasion.state) {
          this.filtredPool.occasionId.push(occasion.occasionId);
        } else {
          this.filtredPool.occasionId = this.filtredPool.occasionId.filter(
            (element) => element !== occasion.occasionId
          );
        }
      } else if (occasion.hasOwnProperty('shapeId')) {
        if (occasion.state) {
          this.filtredPool.shapeId.push(occasion.shapeId);
        } else {
          this.filtredPool.shapeId = this.filtredPool.shapeId.filter(
            (element) => element !== occasion.shapeId
          );
        }
      } else if (occasion.hasOwnProperty('styleId')) {
        if (occasion.state) {
          this.filtredPool.styleId.push(occasion.styleId);
        } else {
          this.filtredPool.styleId = this.filtredPool.styleId.filter(
            (element) => element !== occasion.styleId
          );
        }
      }
      if (
        this.filtredPool.shapeId.length ||
        this.filtredPool.occasionId.length ||
        this.filtredPool.styleId.length
      ) {
        this.data = this.dataPool.filter(
          (element) =>
            this.filtredPool.occasionId.includes(element.occasion) ||
            this.filtredPool.shapeId.includes(element.bodyShape) ||
            this.filtredPool.styleId.includes(element.personalStyle)
        );
      } else {
        this.data = this.dataPool;
      }
    });
  }

  ngOnInit() {
    this.activeTab.valueChanges.subscribe((value) => {
      if (value === 'myLookbook') {
        this.currentApiFields = this.myLookbookFilter;
      } else {
        this.currentApiFields = this.publicLookbookFilter;
      }

      this.api
        .getMyOutfits(this.currentApiFields)
        .subscribe(({ data }: any) => {
          this.data = data;
          this.dataPool = this.data;
          this.hasMore = data.length === 3;
        });
    });

    this.onLoadMore();

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((search) => {
        this.api
          .getMyOutfits({ isPublic: true, search })
          .subscribe(({ data }: any) => {
            this.data = data;
            this.dataPool = this.data;
            this.hasMore = !search.length;
          });
      });
  }

  onLoadMore() {
    const currentSearchFields = {
      ...this.currentApiFields,
      skip: this.data.length,
    };
    this.api.getMyOutfits(currentSearchFields).subscribe(({ data }: any) => {
      this.data = [...this.data, ...data];
      this.dataPool = this.data;
      this.hasMore = data.length === 3;
    });
  }

  goToClothesBuilder() {
    this.router.navigate(['clothes-builder']);
  }

  goToStyleAndPlay() {
    this.router.navigate(['style-and-play']);
  }

  goToHelp() {
    this.router.navigate(['help']);
  }

  onChangeTab(value) {
    this.activeTab.setValue(value);
  }
  edit(event): void {
    this.router.navigate([`/clothes-builder/${event.target.id}`]);
  }
  toOutfit(event): void {
    this.router.navigate([`/outfit-page/${event.target.id}`]);
  }
  authorPage(event): void {
    this.router.navigate([`/profile-page/${event.target.id}`]);
  }
}
