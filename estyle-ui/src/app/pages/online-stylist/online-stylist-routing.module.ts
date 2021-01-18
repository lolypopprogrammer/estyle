import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnlineStylistComponent} from "./online-stylist.component";


const routes: Routes = [
  {
    path: '',
    component: OnlineStylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineStylistRoutingModule { }
