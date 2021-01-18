import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PriceListComponent} from "./price-list.component";
import {PaymentPackagesResolver} from "@app/payment/payment-packages.resolver";

const routes: Routes = [
  {
    path: '',
    component: PriceListComponent,
    resolve: {
      paymentPackage: PaymentPackagesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceListRoutingModule {}
