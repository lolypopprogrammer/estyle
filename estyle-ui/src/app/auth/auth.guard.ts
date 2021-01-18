import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from './../core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuthorized: boolean;
  constructor(private api: ApiService, private router: Router) {
    this.isAuthorized = api.isAuthorized();
  }

  redirect() {
    this.router.navigate(['/account/login']);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.api.isAuthorized()) {
      return true;
    }

    this.redirect();
  }
}
