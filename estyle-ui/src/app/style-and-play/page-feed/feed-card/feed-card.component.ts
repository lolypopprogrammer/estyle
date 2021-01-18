import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../../../core/services/api/api.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
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
  myLike: boolean = false;
  userId: string;
  currentLikes: number;

  constructor(
    private readonly router: Router,
    private api: ApiService
    ) {
    this.userId = this.api.currenUser.id;
   
  }

  ngOnInit(): void {
    if (this.likes.includes(this.userId)) this.myLike = true;
    this.currentLikes = this.likes.length;
  }

  view() {
    this.router.navigate([`outfit-page/${this.id}`]);
  }

  profileView() {
    this.router.navigate([`profile-page/${this.authorId}`]);
  }

  like(): void {
    this.api.like(this.id).subscribe((data: any) => {
        if (data.likes.includes(this.userId)) {
            this.currentLikes += 1;
            this.myLike = true;
        } else {
            this.currentLikes -= 1;
            this.myLike = false;
        }

    });
  }
  
}
