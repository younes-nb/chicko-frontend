import {createAction, props} from '@ngrx/store';
import {Menu, MenuDetails} from '../../../shared/types';

export const fetchMenus = createAction('[Menus] Fetch Menus');

export const fetchMenusFailure = createAction(
  '[Menus] Fetch Menus Failure',
  props<{ error: any }>()
);

export const setMenus = createAction(
  '[Menus] Set Menus',
  props<{ menus: Menu[] }>()
);

export const createMenu = createAction(
  'Menus Create Menu',
  props<{ name: string }>()
);

export const createMenuSuccess = createAction(
  '[Menus] Create Menu Success',
  props<{ menu: Menu }>()
);

export const createMenuFailure = createAction(
  '[Menus] Create Menu Failure',
  props<{ error: any }>()
);


export const fetchMenu = createAction(
  '[Menu Details] Fetch Menu',
  props<{ menuId: string }>()
);

export const fetchMenuFailure = createAction(
  '[Menu Details] Fetch Menu Failure',
  props<{ error: any }>()
);

export const setMenu = createAction(
  '[Menu Details] Set Menu',
  props<{ menu: MenuDetails }>()
);
