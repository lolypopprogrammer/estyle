import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { Configuration } from 'services/estyleApi';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly configuration: Configuration,
    private readonly router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        this.onInvalidToken();
      }
    }));
  }

  onInvalidToken() {
    localStorage.setItem('estyleshaker-auth', null);
    this.configuration.accessToken = undefined;
    this.router.navigateByUrl('/account/login');
  }
}
