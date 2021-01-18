import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers: { [name: string]: string | string[] } = {};
    const authToken = this.getAuthToken();

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request);
  }

  getAuthToken(): string {
    return localStorage.getItem('estyleshaker-auth');
  }
}
