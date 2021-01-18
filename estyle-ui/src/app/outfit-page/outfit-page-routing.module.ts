import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OutfitPageComponent} from './outfit-page.component';


const routes: Routes = [
  {
    path: '',
    component: OutfitPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutfitPageRoutingModule { }
