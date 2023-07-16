import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../../shared/auth.service';
import {UsersService} from '../../../users/users.service';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from "@ngrx/store";
import {CustomSnackBarService} from "../../../shared/custom-snack-bar.service";
import {AuthState} from "./auth.state";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((token) => {
            this.authService.setToken(token.auth_token);
            return AuthActions.loginSuccess();
          }),
          catchError((error) => {
            if (error.error.non_field_errors[0]) {
              this.customSnackBarService.openSnackBar(error.error.non_field_errors[0]);
            } else {
              this.customSnackBarService.openSnackBar('ورود به حساب ناموفق بود.');
            }
            return of(AuthActions.loginFailure({error}));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(async () => {
        this.router.navigate(['dashboard']);
        return AuthActions.fetchUser();
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => {
            this.customSnackBarService.openSnackBar('عملیات ناموفق بود.');
            return of(AuthActions.logoutFailure({error: error.message}));
          })
        )
      )
    )
  );

  logoutSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        this.router.navigate(['login']);
        this.authService.removeToken();
      })
    );
  }, {dispatch: false});

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchUser),
      switchMap(() => {
        if (this.authService.isLoggedIn()) {
          return this.usersService.fetchUser().pipe(
            map((user) => AuthActions.fetchUserSuccess({user})),
            catchError((error) => of(AuthActions.fetchUserFailure({error: error.message})))
          )
        } else {
          this.router.navigate(['login']);
          return of(AuthActions.fetchUserFailure({error: 'User is not authenticated.'}));
        }
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      switchMap(({username, email, phone_number, first_name, last_name, password, profile_image}) =>
        this.usersService.updateUser(
          username,
          email,
          phone_number,
          first_name,
          last_name,
          password,
          profile_image
        ).pipe(
          map((updatedUser) => AuthActions.updateUserSuccess({user: updatedUser})),
          catchError((error) => {
            this.customSnackBarService.openSnackBar('عملیات ناموفق بود.');
            return of(AuthActions.updateUserFailure({error: error.message}));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usersService: UsersService,
    private authStore: Store<AuthState>,
    private customSnackBarService: CustomSnackBarService,
    private router: Router
  ) {
  }
}
