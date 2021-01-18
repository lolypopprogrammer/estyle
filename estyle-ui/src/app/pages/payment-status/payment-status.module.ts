import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { PaymentStatusComponent } from './payment-status.component';
import {PaymentStatusRoutingModule} from "@app/pages/payment-status/payment-status-routing.module";
import { PaymentStatusSuccessComponent } from './payment-status-success/payment-status-success.component';
import { PaymentStatusErrorComponent } from './payment-status-error/payment-status-error.component';

@NgModule({
  declarations: [PaymentStatusComponent, PaymentStatusSuccessComponent, PaymentStatusErrorComponent],
  imports: [CommonModule, PaymentStatusRoutingModule]
})
export class PaymentStatusModule {

}
