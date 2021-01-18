import {Component, OnInit} from '@angular/core';
import {Package, PaymentService} from "../../payment/payment.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  packages$: Observable<Package[]> = this.getPackages$();

  scrollIds = {
    2: 'scroll-free',
    4: 'scroll-fired-up',
    5: 'scroll-elite'
  }

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
  }

  getPackages$(): Observable<Package[]> {
    return this.paymentService.packages$.pipe(
      map(packages => packages.map((p, index) => ({...p, scrollElement: this.getScrollIdByIndex(index)})))
    );
  }

  getScrollIdByIndex(index): string | null {
    return this.scrollIds[index] || null
  }
}
