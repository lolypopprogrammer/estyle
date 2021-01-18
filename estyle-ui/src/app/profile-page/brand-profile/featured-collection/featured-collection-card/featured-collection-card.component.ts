import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-featured-collection-card',
  templateUrl: './featured-collection-card.component.html',
  styleUrls: ['./featured-collection-card.component.scss'],
})
export class FeaturedCollectionCardComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() filter: EventEmitter<any> = new EventEmitter();
  @Input() title: string;
  @Input() href: string;
  @Input() image: string;
  @Input() color = 'light';
  @Input() isChanging: boolean;
  @Input() id: string;
  @Input() active: string;
  isPatchCollection: boolean = false;
  authorId: string = '';
  constructor(private readonly activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe((params) => (this.authorId = params['id']));
  }

  ngOnInit(): void {}

  view(event) {
    if (this.active == this.id) {
      this.filter.emit('');
    } else {
      this.filter.emit(event);
    }
  }
  edit(event): void {
    this.isPatchCollection = true;
  }
  closePopup(event): void {
    this.isPatchCollection = false;
    this.update.emit('update');
  }

  goToCards(event): void {
      document.querySelector('.featured-collection-fashion-combos').scrollIntoView({behavior: "smooth"});
  }
}
