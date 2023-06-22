import {createAction, props} from '@ngrx/store';
import {Category, Menu, MenuDetails, MenuItem} from '../../../shared/types';

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

export const deleteCategory = createAction(
  '[Menus Details] Delete Category',
  props<{ id: string }>()
);

export const deleteCategorySuccess = createAction(
  '[Menus Details] Delete Category Success',
  props<{ id: string }>()
);

export const deleteCategoryFailure = createAction(
  '[Menus Details] Delete Category Failure',
  props<{ error: any }>()
);

export const createMenuItem = createAction(
  '[Menus Details] Create Menu Item',
  props<{
    name: string,
    menu: string,
    category: string,
    image: File,
    is_available: boolean,
    description?: string,
    price?: string,
    discount?: string
  }>()
);

export const createMenuItemSuccess = createAction(
  '[Menus Details] Create Menu Item Success',
  props<{ menuItem: MenuItem }>()
);

export const createMenuItemFailure = createAction(
  '[Menus Details] Create Menu Item Failure',
  props<{ error: any }>()
);

export const updateMenuItem = createAction(
  '[Menus Details] Update Menu Item',
  props<{
    id: string,
    name: string,
    menu: string,
    category: string,
    is_available: boolean,
    image?: File,
    description?: string,
    price?: string,
    discount?: string
  }>()
);

export const updateMenuItemSuccess = createAction(
  '[Menus Details] Update Menu Item Success',
  props<{ menuItem: MenuItem }>()
);

export const updateMenuItemFailure = createAction(
  '[Menus Details] Update Menu Item Failure',
  props<{ error: any }>()
);
