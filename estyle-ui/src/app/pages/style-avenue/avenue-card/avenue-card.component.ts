import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avenue-card',
  templateUrl: './avenue-card.component.html',
  styleUrls: ['./avenue-card.component.scss'],
})
export class AvenueCardComponent {
  @Input() title: string;
  @Input() body: string;
  @Input() href: string;
  @Input() image: string;
  @Input() mobileImage: string;
  @Input() width = '100%';
  @Input() layout: 'column' | 'row' = 'row';
  @Input() isImageBackground = false;
  @Input() isPremium = false;
  @Input() padRight = false;
  @Input() video = false;
  @Input() notPaddingTitle = false;
  @Input() trendingItem = false;

  constructor(private readonly router: Router) {}

  viewMore() {
    if (this.title == 'Trending') {
      window.location.href = this.href;
    } else {
      this.router.navigate([this.href]);
    }
  }
}
