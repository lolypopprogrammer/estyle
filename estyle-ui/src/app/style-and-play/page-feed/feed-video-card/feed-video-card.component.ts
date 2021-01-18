import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../../../core/services/api/api.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-feed-video-card',
  templateUrl: './feed-video-card.component.html',
  styleUrls: ['./feed-video-card.component.scss'],
})
export class FeedVideoCardComponent {
  @Input() author: string;
  @Input() comments: string;
  @Input() likes: string;
  @Input() authorThumbnail: string;
  @Input() name: string;
  @Input() link: string;
  @Input() playerLink: string;
  @Input() authorLink: string;
  @Input() image: string;
  @Input() color = 'light';
  @Input() id;
  @Input() authorId;
  videoIsVisible: boolean;
  savePlayerLink: any;

  constructor(
    private readonly router: Router,
    private api: ApiService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.savePlayerLink = this.safeVideoUrl();
  }

  safeVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.playerLink);
  }

  displayVideo() {
    this.videoIsVisible = true;
  }
}
