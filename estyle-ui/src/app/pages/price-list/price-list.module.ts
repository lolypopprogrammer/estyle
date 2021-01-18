import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceListRoutingModule } from './price-list-routing.module';
import { PriceListComponent } from './price-list.component';
import { PriceListMenuComponent } from './price-list-menu/price-list-menu.component';
import { PricePlanComponent } from './price-plan/price-plan.component';
import {SharedModule} from "../../shared/shared.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {ScrollToModule} from "@nicky-lenaers/ngx-scroll-to";


@NgModule({
  declarations: [PriceListComponent, PriceListMenuComponent, PricePlanComponent],
  imports: [
    CommonModule,
    PriceListRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ScrollToModule
  ]
})
export class PriceListModule { }
