import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'app-virtual-wardrobe-my-drafts',
  templateUrl: './my-drafts.component.html',
  styleUrls: ['./my-drafts.component.scss'],
})
export class MyDraftsComponent implements OnInit {
  data: any = [];
  hasMore: boolean = false;
  activeTab = new FormControl('drafts');
  tabs: any[] = [
    { label: 'My Inspirations', value: 'inspirations' },
    { label: 'My Drafts', value: 'drafts' },
  ];

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.api
      .getMyOutfits({ limit: 3, isPublic: false, isLookbook: false })
      .subscribe(({ data }: any) => {
        this.data = data;
        this.hasMore = data.length === 3;
      });
    this.activeTab.valueChanges.subscribe((value) => {
      if (value === 'inspirations') {
        this.api.getMyOutfits({ limit: 3 }).subscribe(({ data }: any) => {
          this.data = data;
          this.hasMore = data.length === 3;
        });
      } else {
        this.api
          .getMyOutfits({ limit: 3, isPublic: false, isLookbook: false })
          .subscribe(({ data }: any) => {
            this.data = data;
            this.hasMore = data.length === 3;
          });
      }
    });
  }

  onLoadMore() {
    this.api
      .getMyOutfits({ limit: 3, skip: this.data.length, isPublic: false, isLookbook: false })
      .subscribe(({ data }: any) => {
        this.data = [...this.data, ...data];
        this.hasMore = data.length === 3;
      });
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
