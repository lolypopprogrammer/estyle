import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClothesBuilderComponent} from './clothes-builder.component';


const routes: Routes = [
  {
    path: '',
    component: ClothesBuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClothesBuilderRoutingModule {
}
