import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AuthState} from './types';
import {selectIsAuthenticated} from '../core/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authStore: Store<AuthState>) {
  }

  canActivate(): Observable<boolean> {
    return this.authStore.select(selectIsAuthenticated).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
