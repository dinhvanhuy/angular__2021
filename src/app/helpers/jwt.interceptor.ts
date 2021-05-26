import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let currentUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
   
    if (currentUser && currentUser['token']) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser['token']}`,
             //   'Content-Type':  'application/json; multipart/form-data',
            }
        });
    }
    return next.handle(request);
  }
}
