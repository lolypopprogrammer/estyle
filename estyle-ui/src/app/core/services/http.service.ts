import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public get<T>(route: string, params?: any, headers?: any): Observable<T> {
    return this.http.get<T>(this.apiUrl + route, {
      params: new HttpParams({ fromObject: params }),
      headers: new HttpHeaders(headers)
    });
  }

  public post<T>(route: string, body?: any, httpOptions?: any): Observable<any> {
    return this.http.post<T>(this.apiUrl + route, body, httpOptions);
  }

  public patch<T>(route: string, body?: any, httpOptions?: any): Observable<any> {
    return this.http.patch<T>(this.apiUrl + route, body, httpOptions);
  }

  public put<T>(route: string, body?: any, httpOptions?: any): Observable<any> {
    return this.http.put<T>(this.apiUrl + route, body, httpOptions);
  }

  public delete<T>(route: string, httpOptions?: any): Observable<any> {
    return this.http.delete<T>(this.apiUrl + route, httpOptions);
  }
}
