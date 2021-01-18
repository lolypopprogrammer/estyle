import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/services/api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, combineLatest, Observable, of } from 'rxjs';
import {
  shareReplay,
} from 'rxjs/operators';



const CATEGORIES = [
  'eStyleShakers',
  'Brands',
];

export interface ICategory {
  id: number;
  name: string;
}

@Component({
  selector: 'app-page-followers',
  templateUrl: './page-followers.component.html',
  styleUrls: ['./page-followers.component.scss']
})

export class PageFollowersComponent implements OnInit {
  cards: any = [];
  cardsPool: any = [];
  categories$: Observable<ICategory[]>;
  activeCategory$: BehaviorSubject<any> = new BehaviorSubject(1);


  constructor(
    private api: ApiService,
    private readonly router: Router  
  ) { }

  ngOnInit(): void {
    this.categories$ = this.generateCategories$().pipe(shareReplay(1));

    this.api.getAllFollowers().subscribe((data:any) => {
      data.forEach((element) => this.api.getUserById(element.subId).subscribe((userData: any) => {
          this.api.likes(userData.id).subscribe((likesData: any) => userData['totalLikes'] = likesData.reduce((prev, elem) => prev += elem.likes.length, 0));
          this.api.getOutfits({limit: 0, skip: 0, id: userData.id, isPublic: true}).subscribe((outfitsData: any) => {
              userData['totalOutfit'] = outfitsData.total;
              this.cards.push(userData);
              this.cardsPool = this.cards;
          });
      }));
    });

    this.activeCategory$.subscribe((data: any) => {
      if (data == 'Brands') {
        this.cards = this.cardsPool.filter((element) => element['type'] == 'Brand');
      } else if (data == 'eStyleShakers') {  
        this.cards = this.cardsPool.filter((element) => element['type'] == 'User');      
      } 
    });
  }

  toProfilePage(event): void {
    this.router.navigate([`profile-page/${event.target.id}`]);    
  }

  selectCategory(category: any): void {
    this.activeCategory$.next(category.name);
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

}
