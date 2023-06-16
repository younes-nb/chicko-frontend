import {createReducer, on} from '@ngrx/store';
import {MenuDetails, MenusState} from '../../../shared/types';
import * as MenuActions from './menus.actions';

export const initialState: MenusState = {
  menus: [{
    id: '',
    name: '',
    number_of_categories: '',
    number_of_items: '',
    link: ''
  }],
  menuDetails: null
};
export const menusReducer = createReducer<MenusState>(
  initialState,
  on(MenuActions.setMenus, (state, {menus}) => ({...state, menus: [...menus]})),
  on(MenuActions.createMenuSuccess, (state, {menu}) => ({...state, menus: [...state.menus, menu]}))
);

export const menuDetailsReducer = createReducer<MenuDetails | null>(
  null,
  on(MenuActions.setMenu, (state, {menu}) => menu)
);
