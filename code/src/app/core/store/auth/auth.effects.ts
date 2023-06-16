import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../../shared/auth.service';
import {UsersService} from '../../../users/users.service';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {selectIsAuthenticated} from "./auth.selectors";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../shared/types";
import {CustomSnackBarService} from "../../../shared/custom-snack-bar.service";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((response) =>
            AuthActions.loginSuccess({token: response.auth_token})
          ),
          catchError((error) => {
            const errorMessage = error?.error?.message || 'An unknown error occurred.';
            this.customSnackBarService.openSnackBar('ورود به حساب ناموفق بود.')
            return of(AuthActions.loginFailure({error: errorMessage}));
          })
        )
      )
    )
  );


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => of(AuthActions.logoutFailure({error: error.message})))
        )
      )
    )
  );

  fetchUserAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(async () => AuthActions.fetchUser())
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchUser),
      withLatestFrom(this.authStore.select(selectIsAuthenticated)),
      switchMap(([action, isAuthenticated]) => {
        if (isAuthenticated) {
          return this.usersService.fetchUser().pipe(
            map((user) => AuthActions.fetchUserSuccess({user})),
            catchError((error) => of(AuthActions.fetchUserFailure({error: error.message})))
          )
        } else {
          return of(AuthActions.fetchUserFailure({error: 'User is not authenticated.'}));
        }
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      switchMap(({username, email, phone_number, first_name, last_name, password}) =>
        this.usersService.updateUser(
          username,
          email,
          phone_number,
          first_name,
          last_name,
          password
        ).pipe(
          map((updatedUser) => AuthActions.updateUserSuccess({user: updatedUser})),
          catchError((error) => of(AuthActions.updateUserFailure({error: error.message})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usersService: UsersService,
    private authStore: Store<AuthState>,
    private customSnackBarService: CustomSnackBarService
  ) {
  }
}
