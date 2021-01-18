import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';
import { OccasionService } from '../wardrobe-category-card/occasion.service';

@Component({
  selector: 'app-virtual-wardrobe-my-clothes',
  templateUrl: './my-clothes.component.html',
  styleUrls: ['./my-clothes.component.scss'],
})
export class MyClothesComponent implements OnInit {
  categories: any = [];
  products: any = [];
  activeFilter: string = '';
  hasMore: boolean = false;
  activeOccasion: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private occasion: OccasionService
  ) {
    this.occasion.onClick.subscribe((occasion) => {
      this.api.getOccasionsById(occasion).subscribe((data: any) => {
        this.activeOccasion = data.name;
        this.api
          .getMyClothingItems({
            categoryId: this.activeFilter,
            occasionName: this.activeOccasion,
          })
          .subscribe((data: any) => {
            this.products = data.data;
            this.hasMore = this.products.length < data.total;
          });
      });
    });
  }

  ngOnInit() {
    this.api.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.api.getMyClothingItems().subscribe((data: any) => {
      this.products = data.data;
      this.hasMore = this.products.length < data.total;
    });
  }

  onFilter(category = '') {
    this.activeFilter = category;
    this.api
      .getMyClothingItems({
        categoryId: this.activeFilter,
        occasionName: this.activeOccasion,
      })
      .subscribe((data: any) => {
        this.products = data.data;
        this.hasMore = this.products.length < data.total;
      });
  }

  onLoadMore() {
    this.api
      .getMyClothingItems({
        limit: 3,
        skip: this.products.length,
        categoryId: this.activeFilter,
        occasionName: this.activeOccasion,
      })
      .subscribe((data: any) => {
        this.products = [...this.products, ...data.data];
        this.hasMore = this.products.length < data.total;
      });
  }

  goToAddForm() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  clothingEdit(id) {
    this.router.navigate([`add/${id}`], { relativeTo: this.route });
  }
}
