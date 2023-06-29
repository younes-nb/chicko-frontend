import {createAction, props} from '@ngrx/store';
import {User} from '../../../shared/types';

export const login = createAction(
  '[Auth/API] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success'
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth/API] Logout');
export const logoutSuccess = createAction('[Auth/API] Logout Success');
export const logoutFailure = createAction('[Auth/API] Logout Failure', props<{ error: string }>());

export const fetchUser = createAction('[Auth/API] Fetch User');

export const fetchUserSuccess = createAction(
  '[Auth/API] Fetch User Success',
  props<{ user: User }>()
);

export const fetchUserFailure = createAction(
  '[Auth/API] Fetch User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User/API] Update User',
  props<{
    username: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    password: string;
  }>()
);

export const updateUserSuccess = createAction(
  '[Auth/API] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[Auth/API] Update User Failure',
  props<{ error: string }>()
);
