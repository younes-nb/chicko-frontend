import {createReducer, on} from '@ngrx/store';
import {MenuDetails} from '../../../shared/types';
import * as MenuActions from './menus.actions';
import {menuDetailsInitialState, menusInitialState, MenusState} from "./menus.state";


export const menusReducer = createReducer<MenusState>(
  menusInitialState,
  on(MenuActions.setMenus, (state, {menus}) => ({...state, menus: [...menus]})),
  on(MenuActions.createMenuSuccess, (state, {menu}) => ({...state, menus: [...state.menus, menu]})),
  on(MenuActions.setThemes, (state, {themes}) => ({...state, themes: [...themes]}))
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
  })),
  on(MenuActions.deleteCategorySuccess, (state, {id}) => ({
    ...state,
    categories: state.categories.filter(c => c.id !== id)
  })),
  on(MenuActions.createMenuItemSuccess, (state, {menuItem}) => ({
    ...state,
    categories: state.categories.map(category => {
      if (category.id === menuItem.category) {
        return {
          ...category,
          menu_items: [...category.menu_items, menuItem],
          number_of_items: String(Number(category.number_of_items) + 1)
        };
      } else {
        return category;
      }
    })
  })),
  on(MenuActions.updateMenuItemSuccess, (state, {menuItem}) => ({
    ...state,
    categories: state.categories.map(category => {
      if (category.id === menuItem.category) {
        return {
          ...category,
          menu_items: category.menu_items.map(item => {
            if (item.id === menuItem.id) {
              return menuItem;
            } else {
              return item;
            }
          })
        };
      } else {
        return category;
      }
    })
  })),
  on(MenuActions.deleteMenuItemSuccess, (state, {id}) => ({
    ...state,
    categories: state.categories.map(category => {
      const filteredMenuItems = category.menu_items.filter(item => item.id !== id);
      const numberOfItems = filteredMenuItems.length.toString();
      return {
        ...category,
        menu_items: filteredMenuItems,
        number_of_items: numberOfItems
      };
    })
  }))
);
