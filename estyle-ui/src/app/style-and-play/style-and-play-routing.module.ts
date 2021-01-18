import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StyleAndPlayComponent} from "./style-and-play.component";


const routes: Routes = [
  {
    path: '',
    component: StyleAndPlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StyleAndPlayRoutingModule { }
