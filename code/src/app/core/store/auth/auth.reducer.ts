import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {AuthState, initialAuthState} from "./auth.state";


export const authReducer = createReducer<AuthState>(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, {token}) => ({
    ...state,
    isAuthenticated: true,
    user: null,
    token,
    error: null
  })),
  on(AuthActions.loginFailure, (state, {error}) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null,
    error
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null,
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
