import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ApiService} from '../../core/services/api/api.service';
import {DomSanitizer} from '@angular/platform-browser';

const DEFAULT_FILTER = 'all';

@Component({
  selector: 'app-page-feed',
  templateUrl: './page-feed.component.html',
  styleUrls: ['./page-feed.component.scss'],
})
export class PageFeedComponent implements OnInit{
  products: any = [];
  filteredProducts: any = [];
  categories: any = [];
  outfitCards: any = [];
  activeFilter: string = DEFAULT_FILTER;
  authorThumbnail: string = 'assets/images/ai.png';
  hasMore: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService

  ) {}

  ngOnInit() {
    this.api
      .getOutfits({isPublic: true})
      .subscribe((data: any) => {
        this.outfitCards = data.data;
        if(data.total > 6)this.hasMore = true;
      });
  }


  loadMoreFeeds():void {
    this.api
      .getOutfits({ limit: 3, skip: this.outfitCards.length, isPublic: true })
      .subscribe((data: any) => {
        this.outfitCards = [...this.outfitCards, ...data.data];
        if (data.total === this.outfitCards.length) {
          this.hasMore = false;
        }
      });
  }
}
