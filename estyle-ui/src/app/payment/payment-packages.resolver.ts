import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PaymentService} from "@app/payment/payment.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaymentPackagesResolver implements Resolve<any> {
  constructor(private paymentService: PaymentService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.paymentService.getPackages$().pipe(map(packages => !!packages));
  }
}
