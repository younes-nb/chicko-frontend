import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectAuthToken} from '../core/store/auth/auth.selectors';
import {AuthState} from "../core/store/auth/auth.state";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authStore: Store<AuthState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const needsToken = request.headers.has('NeedsUserTokenHeader');
    if (needsToken) {
      return this.authStore.select(selectAuthToken).pipe(
        take(1),
        switchMap((token) => {
          if (token) {
            const headers = request.headers
              .set('Authorization', `Token ${token}`)
              .delete('NeedsUserTokenHeader');
            request = request.clone({headers});
          }
          return next.handle(request);
        })
      );
    }
    return next.handle(request);
  }
}
