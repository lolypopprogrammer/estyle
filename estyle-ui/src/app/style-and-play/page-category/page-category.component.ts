import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../../core/services/api/api.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.scss']
})

export class PageCategoryComponent implements OnInit {

  constructor(
      private readonly router: Router,
      private api: ApiService
  ) { }

  ngOnInit(): void {
  }
 
  toClotherBuilder():void {
    this.router.navigate([`clothes-builder`]);
  }
  toProfile(): void {
    this.router.navigate([`/profile-page/${this.api.currenUser.id}`]);
  }
  toVirtualWardrobe(): void {
    this.router.navigate([`virtual-wardrobe`]);
  }
}
