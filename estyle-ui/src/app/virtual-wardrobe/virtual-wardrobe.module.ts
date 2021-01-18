import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { VirtualWardrobeRoutingModule } from './virtual-wardrobe-routing.module';
import { VirtualWardrobeComponent } from './virtual-wardrobe.component';
import { WardrobeCategoryCardComponent } from './wardrobe-category-card/wardrobe-category-card.component';
import { PageAddFormComponent } from './page-add-form/page-add-form.component';
import { MyClothesComponent } from './my-clothes/my-clothes.component';
import { MyOutfitsComponent } from './my-outfits/my-outfits.component';
import { MyDraftsComponent } from './my-drafts/my-drafts.component';
import { UITagsComponent } from './ui/tags/tags.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OccasionService } from './wardrobe-category-card/occasion.service';
import { SearchPanelModule } from '../ui/search-panel/search-panel.module';
import { ComponentTitleModule } from '../ui/component-title/component-title.module';
import { StyleCalendarComponent } from './style-calendar/style-calendar.component';
import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { UiSelectModule } from '../ui/select/select.module';
import { UiInputModule } from '../ui/input/input.module';
import { SearchInApiService } from '../ui/search-panel/search-in-api.service';

@NgModule({
  declarations: [
    PageAddFormComponent,
    VirtualWardrobeComponent,
    WardrobeCategoryCardComponent,
    MyClothesComponent,
    MyOutfitsComponent,
    MyDraftsComponent,
    UITagsComponent,
    StyleCalendarComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    VirtualWardrobeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    SearchPanelModule,
    ComponentTitleModule,
    CalendarCommonModule,
    CalendarMonthModule,
    UiSelectModule,
    UiInputModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [OccasionService, SearchInApiService],
})
export class VirtualWardrobeModule {}
