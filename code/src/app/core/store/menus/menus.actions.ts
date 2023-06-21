import {createAction, props} from '@ngrx/store';
import {Category, Menu, MenuDetails} from '../../../shared/types';

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
  '[Menus] Create Menu',
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

export const deleteMenu = createAction(
  '[Menu Details] Delete Menu',
  props<{ menuId: string }>()
);

export const deleteMenuSuccess = createAction(
  '[Menu Details] Delete Menu Success'
);

export const deleteMenuFailure = createAction(
  '[Menu Details] Delete Menu Failure',
  props<{ error: any }>()
);

export const createCategory = createAction(
  '[Menus Details] Create Category',
  props<{ name: string, menu: string }>()
);

export const createCategorySuccess = createAction(
  '[Menus Details] Create Category Success',
  props<{ category: Category }>()
);

export const createCategoryFailure = createAction(
  '[Menus Details] Create Category Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[Menus Details] Update Category',
  props<{ id: string, name: string, menu: string }>()
);

export const updateCategorySuccess = createAction(
  '[Menus Details] Update Category Success',
  props<{ category: Category }>()
);

export const updateCategoryFailure = createAction(
  '[Menus Details] Update Category Failure',
  props<{ error: any }>()
);
