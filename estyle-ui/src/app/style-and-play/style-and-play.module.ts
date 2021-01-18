import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleAndPlayRoutingModule } from './style-and-play-routing.module';
import { StyleAndPlayComponent } from './style-and-play.component';
import { PageMainComponent } from './page-main/page-main.component';
import { PageCategoryComponent } from './page-category/page-category.component';
import { PageFeedComponent } from './page-feed/page-feed.component';
import { FeedCardComponent } from './page-feed/feed-card/feed-card.component';
import { PageVideosComponent } from './page-videos/page-videos.component';
import { FeedVideoCardComponent } from './page-feed/feed-video-card/feed-video-card.component';
import { ComponentTitleModule } from '../ui/component-title/component-title.module';
import { PageFollowersComponent } from './page-followers/page-followers.component';


@NgModule({
  declarations: [
    StyleAndPlayComponent,
    PageMainComponent,
    PageCategoryComponent,
    PageFeedComponent,
    FeedCardComponent,
    PageVideosComponent,
    FeedVideoCardComponent,
    PageFollowersComponent
  ],
//   exports: [PageFeedComponent, PageVideosComponent],
  imports: [CommonModule, StyleAndPlayRoutingModule, ComponentTitleModule],
})
export class StyleAndPlayModule {}
