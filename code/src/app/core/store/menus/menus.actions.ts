import {createAction, props} from '@ngrx/store';
import {Category, Menu, MenuDetails, MenuItem, Theme} from '../../../shared/types';

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

export const updateMenu = createAction(
  '[Menu Details] Update Menu',
  props<{ id: string, name: string, theme?: Theme, telephone?: string, phone?: string, address?: string }>()
)

export const updateMenuFailure = createAction(
  '[Menu Details] Update Menu Failure',
  props<{ error: any }>()
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
  '[Categories] Create Category',
  props<{ name: string, menu: string }>()
);

export const createCategorySuccess = createAction(
  '[Categories] Create Category Success',
  props<{ category: Category }>()
);

export const createCategoryFailure = createAction(
  '[Categories] Create Category Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[Categories] Update Category',
  props<{ id: string, name: string, menu: string }>()
);

export const updateCategorySuccess = createAction(
  '[Categories] Update Category Success',
  props<{ category: Category }>()
);

export const updateCategoryFailure = createAction(
  '[Categories] Update Category Failure',
  props<{ error: any }>()
);

export const deleteCategory = createAction(
  '[Categories] Delete Category',
  props<{ id: string }>()
);

export const deleteCategorySuccess = createAction(
  '[Categories] Delete Category Success',
  props<{ id: string }>()
);

export const deleteCategoryFailure = createAction(
  '[Categories] Delete Category Failure',
  props<{ error: any }>()
);

export const createMenuItem = createAction(
  '[Menu Items] Create Menu Item',
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
  '[Menu Items] Create Menu Item Success',
  props<{ menuItem: MenuItem }>()
);

export const createMenuItemFailure = createAction(
  '[Menu Items] Create Menu Item Failure',
  props<{ error: any }>()
);

export const updateMenuItem = createAction(
  '[Menu Items] Update Menu Item',
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
  '[Menu Items] Update Menu Item Success',
  props<{ menuItem: MenuItem }>()
);

export const updateMenuItemFailure = createAction(
  '[Menu Items] Update Menu Item Failure',
  props<{ error: any }>()
);

export const deleteMenuItem = createAction(
  '[Menu Items] Delete Menu Item',
  props<{ id: string }>()
);

export const deleteMenuItemSuccess = createAction(
  '[Menu Items] Delete Menu Item Success',
  props<{ id: string }>()
);

export const deleteMenuItemFailure = createAction(
  '[Menu Items] Delete Menu Item Failure',
  props<{ error: any }>()
);

export const fetchThemes = createAction(
  '[Themes] Fetch Themes',
);

export const fetchThemesFailure = createAction(
  '[Themes] Fetch Themes Failure',
  props<{ error: any }>()
);

export const setThemes = createAction(
  '[Themes] Set Themes',
  props<{ themes: Theme[] }>()
);
