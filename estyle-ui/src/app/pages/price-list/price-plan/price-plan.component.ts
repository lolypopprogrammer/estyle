import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {
  Package,
  PackageVariation,
  PackageVariationService,
  PaymentDetails,
  PaymentService
} from "@app/payment/payment.service";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, first, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-price-plan',
  templateUrl: './price-plan.component.html',
  styleUrls: ['./price-plan.component.scss']
})
export class PricePlanComponent implements OnInit {
  @Input() direction = 'left';

  @Input() set packageItem(packageItem: Package) {
    this.packageSubject$.next(packageItem);
    this.variationsSubject$.next(packageItem.variations);
    this.servicesSubject$.next(packageItem.services.length > 0 ? packageItem.services : packageItem.variations[0].services);
    this.selected = packageItem.defaultVariation || packageItem.variations[0];
  };

  variationsSubject$: BehaviorSubject<PackageVariation[]> = new BehaviorSubject<PackageVariation[]>(null);
  variations$: Observable<PackageVariation[]> = this.variationsSubject$.asObservable();

  packageSubject$: BehaviorSubject<Package> = new BehaviorSubject(null);
  package$: Observable<Package> = this.packageSubject$.asObservable();

  servicesSubject$: BehaviorSubject<PackageVariationService[]> = new BehaviorSubject(null);
  services$: Observable<PackageVariationService[]> = this.servicesSubject$.asObservable();

  loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loading$: Observable<boolean> = this.loadingSubject$.asObservable();

  selected: PackageVariation;

  @HostListener('click', ['$event'])
  onClick(event): void {
    this.requestPayment();
  }

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
  }

  onSelectAreaClick(event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onSelected(event): void {
    this.servicesSubject$.next(this.selected.services);
  }

  requestPayment(): void {
    this.loading$.pipe(
      first(),
      filter(loading => !loading),
      tap(() => this.loadingSubject$.next(true)),
      switchMap(loading => this.package$),
      switchMap(packageItem => this.paymentService.request$({
        packageId: packageItem.id,
        sku: this.selected.sku
      }))
    ).subscribe((paymentDetails: PaymentDetails) => this.goToPaymentService(paymentDetails));
  }

  goToPaymentService(paymentDetails: PaymentDetails): void {
    window.open(paymentDetails.order.url, '_blank');
    this.loadingSubject$.next(false);
  }

}
