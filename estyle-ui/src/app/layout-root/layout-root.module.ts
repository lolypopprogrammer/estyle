import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRootComponent } from './layout-root/layout-root.component';
import { RouterModule } from '@angular/router';
import {NewsletterModule} from "../components/newsletter/newsletter.module";


@NgModule({
  declarations: [LayoutRootComponent],
  imports: [
    CommonModule,
    RouterModule,
    NewsletterModule
  ],
  exports: [
    LayoutRootComponent
  ]
})
export class LayoutRootModule {
}
