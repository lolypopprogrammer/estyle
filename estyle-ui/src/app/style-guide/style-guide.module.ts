import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleGuideRoutingModule } from './style-guide-routing.module';
import { StyleGuideComponent } from './style-guide.component';
import { PageCardComponent } from './page-card/page-card.component';
import { TextImageBlockComponent } from './text-image-block/text-image-block.component';
import { PageMainComponent } from './page-main/page-main.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageResultsComponent } from './page-results/page-results.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { PageFactorComponent } from './page-factor/page-factor.component';
import { PagePersonalStyleComponent } from './page-personal-style/page-personal-style.component';
import { PageGuideComponent } from './page-guide/page-guide.component';


@NgModule({
  declarations: [StyleGuideComponent, PageCardComponent, TextImageBlockComponent, PageMainComponent, PageAboutComponent, PageResultsComponent, PageDetailComponent, PageFactorComponent, PagePersonalStyleComponent, PageGuideComponent],
  imports: [
    CommonModule,
    StyleGuideRoutingModule
  ]
})
export class StyleGuideModule { }
