import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OneToOneSessionComponent} from "./one-to-one-session.component";


const routes: Routes = [
  {
    path: '',
    component: OneToOneSessionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneToOneSessionRoutingModule { }
