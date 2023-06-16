import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.state";


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthError = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.error
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isAuthenticated
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.token
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user
);
