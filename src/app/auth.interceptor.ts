import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, retry } from 'rxjs';
import { AuthService } from './auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  auth_token = ''

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const tokenReq = req.clone ({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`
        }
      })
      return next.handle(tokenReq).pipe(
        retry(1)
      );
  }
}