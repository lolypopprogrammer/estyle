import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OccasionService } from './occasion.service';

@Component({
  selector: 'app-wardrobe-category-card',
  templateUrl: './wardrobe-category-card.component.html',
  styleUrls: ['./wardrobe-category-card.component.scss'],
})
export class WardrobeCategoryCardComponent {
  @Input() title: string;
  @Input() href: string;
  @Input() image: string;
  @Input() color = 'light';
  @Input() id: string;
  current: string = '';

  constructor(
    private readonly router: Router,
    private occasion: OccasionService
  ) {
    this.occasion.onClick.subscribe((occasion) => {
      this.current = occasion;
    });
  }

  public clickMe(id) {
    if (id == this.current) {
      this.occasion.doClick('');
    } else {
      this.occasion.doClick(id);
    }
  }

  view() {
    this.router.navigate([this.href]);
  }
}
