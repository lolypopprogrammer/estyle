import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {PaymentService} from "@app/payment/payment.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PaymentStatusResolver implements Resolve<any> {
  constructor(private paymentService: PaymentService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const id = route.paramMap.get('id');
    return this.paymentService.getPaymentStatus$(id);
  }
}
