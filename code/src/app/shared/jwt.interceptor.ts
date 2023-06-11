import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has('NeedsUserTokenHeader')) {
      const userToken: string = this.storageService.getUserToken();
      if (userToken) {
        request = request.clone({
          setHeaders: {
            Authorization: userToken,
          },
        });

        request = request.clone({
          headers: request.headers.delete('NeedsUserTokenHeader'),
        });
      }
    }

    return next.handle(request);
  }
}
