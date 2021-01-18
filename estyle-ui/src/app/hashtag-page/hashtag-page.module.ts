import { NgModule } from '@angular/core';
import { HashtagPageComponent } from './hashtag-page.component';
import { CommonModule } from '@angular/common';
import { HashtagPageRoutingModule } from './hashtag-page-routing.module';
import { PageMainComponent } from './page-main/page-main.component';
import { FeedCardComponent } from './page-feed/feed-card/feed-card.component';
import { PageFeedComponent } from './page-feed/page-feed.component';

@NgModule({
  declarations: [
    HashtagPageComponent, PageMainComponent, FeedCardComponent, PageFeedComponent
  ],
  imports: [
    CommonModule, HashtagPageRoutingModule
  ],
})
export class HashtagPageModule {}
