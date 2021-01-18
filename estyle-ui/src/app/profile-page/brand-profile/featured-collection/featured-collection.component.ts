import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-featured-collection',
  templateUrl: './featured-collection.component.html',
  styleUrls: ['./featured-collection.component.scss'],
})
export class FeaturedCollectionComponent implements OnInit {
  @Input() isChanging: boolean;
  @Output() filter: EventEmitter<any> = new EventEmitter();
  cards: any = [];
  activeId: string = "";
  hasMore: boolean = false;
  total: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCollection().subscribe((data: any) => {
      this.cards = data.data;
      this.total = data.data.length;
      if (data.total > 4) this.hasMore = true;
    });
  }

  updateCollection(): void {
    this.api.getCollection({ skip: this.total }).subscribe((data: any) => {
      this.cards = [...this.cards, ...data.data];
      this.total = this.cards.length;
      if (data.total <= this.total) this.hasMore = false;
    });
  }
  occasionFilter(event): void {
    this.filter.emit(event);
    
    this.activeId = event ? event.target.id : "";
    
  }
}
