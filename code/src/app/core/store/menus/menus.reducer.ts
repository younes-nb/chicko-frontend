import {createReducer, on} from '@ngrx/store';
import {MenuDetails} from '../../../shared/types';
import * as MenuActions from './menus.actions';
import {menuDetailsInitialState, menusInitialState, MenusState} from "./menus.state";


export const menusReducer = createReducer<MenusState>(
  menusInitialState,
  on(MenuActions.setMenus, (state, {menus}) => ({...state, menus: [...menus]})),
  on(MenuActions.createMenuSuccess, (state, {menu}) => ({...state, menus: [...state.menus, menu]}))
);

export const menuDetailsReducer = createReducer<MenuDetails>(
  menuDetailsInitialState,
  on(MenuActions.setMenu, (state, {menu}) => menu),
  on(MenuActions.createCategorySuccess, (state, {category}) => ({
    ...state,
    categories: [...state.categories, category]
  })),
  on(MenuActions.updateCategorySuccess, (state, {category}) => ({
    ...state,
    categories: state.categories.map(c => {
      if (c.id === category.id) {
        return {...c, name: category.name};
      }
      return c;
    })
  }))
);
