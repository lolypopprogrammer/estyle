import {NgModule} from "@angular/core";
import {PaymentStatusComponent} from './payment-status.component';
import {RouterModule, Routes} from "@angular/router";
import {PaymentStatusSuccessComponent} from "@app/pages/payment-status/payment-status-success/payment-status-success.component";
import {PaymentStatusErrorComponent} from "@app/pages/payment-status/payment-status-error/payment-status-error.component";
import {PaymentStatusResolver} from "@app/pages/payment-status/payment-status.resolver";

const routes: Routes = [
  {
    path: '',
    component: PaymentStatusComponent,
    children: [
      {
        path: 'success/:id',
        component: PaymentStatusSuccessComponent,
        resolve: {
          paymentStatus: PaymentStatusResolver
        }
      },
      {
        path: 'error',
        component: PaymentStatusErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentStatusRoutingModule {

}
