import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.state";


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user
);
