import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const needsToken = request.headers.has('NeedsUserTokenHeader');
    if (needsToken) {
      const token = this.authService.getToken();
      if (token) {
        const headers = request.headers
          .set('Authorization', `Token ${token}`)
          .delete('NeedsUserTokenHeader');
        request = request.clone({headers});
      } else {
        const headers = request.headers
          .delete('NeedsUserTokenHeader');
        request = request.clone({headers});
      }
      return next.handle(request);
    }
    return next.handle(request);
  }
}
