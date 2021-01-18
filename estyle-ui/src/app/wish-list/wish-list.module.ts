import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishListRoutingModule } from './wish-list-routing.module';
import { WishListComponent } from './wish-list/wish-list.component';
import { SharedModule } from "../shared/shared.module";
import {UiModule} from "../ui/ui.module";
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [WishListComponent, ProductListComponent],
  imports: [
    CommonModule,
    WishListRoutingModule,
    SharedModule,
    UiModule
  ]
})
export class WishListModule { }
