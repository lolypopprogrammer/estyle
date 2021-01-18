import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './profile-page.component';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { PageMainComponent } from './page-main/page-main.component';
import { CommonModule } from '@angular/common';
import { PageFeedComponent } from './page-feed/page-feed.component';
import { FeedCardComponent } from './page-feed/feed-card/feed-card.component';
import { BrandProfileComponent } from './brand-profile/brand-profile.component';
import { FeaturedCollectionComponent } from './brand-profile/featured-collection/featured-collection.component';
import { FeaturedCollectionCardComponent } from './brand-profile/featured-collection/featured-collection-card/featured-collection-card.component';
// import { StyleAndPlayModule } from '../style-and-play/style-and-play.module';
import { BrandPageMainComponent } from './brand-profile/page-main/page-main.component';
import { AdvertisementSliderComponent } from './brand-profile/advertisement-slider/advertisement-slider.component';
import { NguCarouselModule } from '@ngu/carousel';
import { SearchPanelModule } from '../ui/search-panel/search-panel.module';
import { SearchInApiService } from '../ui/search-panel/search-in-api.service';
import { ComponentTitleModule } from '../ui/component-title/component-title.module';
import { PopoverModule } from '../ui/popover/popover.module';
import { PopupCreateCollectionComponent } from './brand-profile/featured-collection/popup-create-collection/popup-create-collection.component';
import { UiInputModule } from '../ui/input/input.module';
import { UiSelectModule } from '../ui/select/select.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ProfilePageComponent,
    PageMainComponent,
    PageFeedComponent,
    FeedCardComponent,
    BrandProfileComponent,
    FeaturedCollectionComponent,
    FeaturedCollectionCardComponent,
    BrandPageMainComponent,
    AdvertisementSliderComponent,
    PopupCreateCollectionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    NguCarouselModule,
    SearchPanelModule,
    ComponentTitleModule,
    PopoverModule,
    UiInputModule,
    FormsModule,
    UiSelectModule,
    NgSelectModule,
  ],
  providers: [SearchInApiService],
})
export class ProfilePageModule {}
