import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../core/services/api/api.service";

@Component({
  selector: 'profile-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})

export class FeedCardComponent {
  @Input() author: string;
  @Input() comments: string;
  @Input() likes: string;
  @Input() authorThumbnail: string;
  @Input() name: string;
  @Input() href: string;
  @Input() image: string;
  @Input() color = 'light';
  @Input() id;
  @Input() authorId;

  constructor(
    private readonly router: Router,
  ) {
  }

  view() {
    this.router.navigate([`outfit-page/${this.id}`]);
  }

  profileView() {
    this.router.navigate([`profile-page/${this.authorId}`]);
  }
}

