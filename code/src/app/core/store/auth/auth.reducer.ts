import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {AuthState} from "../../../shared/types";

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null
};
export const authReducer = createReducer(
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
  on(AuthActions.logout, (state) => ({
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
