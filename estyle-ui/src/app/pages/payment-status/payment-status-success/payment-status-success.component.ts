import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "@app/payment/payment.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-payment-status-success',
  templateUrl: './payment-status-success.component.html',
  styleUrls: ['./payment-status-success.component.scss']
})
export class PaymentStatusSuccessComponent implements OnInit {
  paymentStatus$: Observable<number> = this.paymentService.paymentStatus$;
  paymentStatusMessage$: Observable<string> = this.paymentService.paymentStatusMessage$;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {
  }

  ngOnInit(): void {
  }

}
