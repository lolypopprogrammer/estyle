import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VirtualWardrobeComponent } from './virtual-wardrobe.component';
import { PageAddFormComponent } from './page-add-form/page-add-form.component';

const routes: Routes = [
  {
    path: '',
    component: VirtualWardrobeComponent,
  },
  {
    path: 'add',
    component: PageAddFormComponent,
  },
  {
    path: 'add/:id',
    component: PageAddFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VirtualWardrobeRoutingModule {}
