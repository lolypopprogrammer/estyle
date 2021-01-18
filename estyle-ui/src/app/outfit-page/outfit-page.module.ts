import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {OutfitPageComponent} from './outfit-page.component';
import {OutfitPageRoutingModule} from './outfit-page-routing.module';
import {PageMainComponent} from './page-main/page-main.component';
import {PageCommentsComponent} from './page-comments/page-comments.component';
import { CommentComponent } from './page-comments/comment/comment.component';
import { UiInputModule } from '../ui/input/input.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    OutfitPageComponent,
    PageMainComponent,
    PageCommentsComponent,
    CommentComponent
  ],
    imports: [
        CommonModule,
        OutfitPageRoutingModule,
        FormsModule,
        UiInputModule,
        ReactiveFormsModule
    ]
})
export class OutfitPageModule { }
