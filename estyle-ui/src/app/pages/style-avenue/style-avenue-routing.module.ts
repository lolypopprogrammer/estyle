import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StyleAvenueComponent } from "./style-avenue.component";


const routes: Routes = [
  {
    path: '',
    component: StyleAvenueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StyleAvenueRoutingModule { }
