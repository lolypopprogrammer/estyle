import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService} from "../core/services/http.service";
import {map, tap} from "rxjs/operators";

export interface PackageVariationService {
  title: string
}

export interface PackageVariation {
  name: string;
  price: number;
  interval: number;
  sku: string;
  services: PackageVariationService[];
  isArchived: boolean;
  id: string;
  createdOn: string;
}

export interface Package {
  name: string;
  paymentType: string;
  services: PackageVariationService[];
  defaultVariation: PackageVariation;
  variations: PackageVariation[];
  isArchived: boolean;
  id: string;
  createdOn: string;
  scrollElement?: string;
}

export interface IRequestPayment {
  packageId: string;
  sku: string;
}

export interface PaymentDetails {
  method: string;
  trace: string;
  order: {
    ref: string;
    url: string;
  }
}

const headers = {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjcxZGFjOWFiZTdkYzIyOTViOTcxMTYiLCJpYXQiOjE2MDEyOTcxOTAsImV4cCI6MTY3OTA1NzE5MH0.S7NGXqlzXVutgwi6CP0S22grkR9uJJD6JE6dd7KMCaQ"
}

const STATUS_MESSAGES = {
  0: 'Payment is failed',
  1: 'Payment is pending',
  2: 'Payment is authorised',
  3: 'Payment was successful',
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private URL = '/payment';

  private packagesSubject$: BehaviorSubject<Package[]> = new BehaviorSubject(null);
  packages$: Observable<Package[]> = this.packagesSubject$.asObservable();

  private paymentStatusSubject$: BehaviorSubject<number> = new BehaviorSubject(null);
  paymentStatus$: Observable<number> = this.paymentStatusSubject$.asObservable();

  get paymentStatusMessage$(): Observable<string> {
    return this.paymentStatus$.pipe(map(status => STATUS_MESSAGES[status]));
  }

  constructor(private httpService: HttpService) {
  }

  getPackages$(params?: any): Observable<Package[]> {
    return this.httpService.get(`${this.URL}/package`, params).pipe(
      tap((packages: Package[]) => this.packagesSubject$.next(packages))
    );
  }

  request$(requestBody: IRequestPayment): Observable<PaymentDetails> {
    return this.httpService.post(`${this.URL}`, requestBody);
  }

  getPaymentStatus$(id: string): Observable<any> {
    return this.httpService.get(`${this.URL}/${id}/status`, {id}).pipe(
      tap((status: number) => this.paymentStatusSubject$.next(status))
    );
  }
}
