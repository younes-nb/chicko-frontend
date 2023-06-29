import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {AuthState, initialAuthState} from "./auth.state";


export const authReducer = createReducer<AuthState>(
  initialAuthState,
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    user: null,
    error: null
  })),
  on(AuthActions.loginFailure, (state, {error}) => ({
    ...state,
    user: null,
    error
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    error: null
  })),
  on(AuthActions.fetchUserSuccess, (state, {user}) => ({
    ...state,
    user,
  })),
  on(AuthActions.updateUserSuccess, (state, {user}) => ({
    ...state,
    user,
  }))
);
