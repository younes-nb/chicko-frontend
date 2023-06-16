import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Menu, MenusState} from "../../../shared/types";

export const selectMenusState: MemoizedSelector<object, MenusState> = createFeatureSelector<MenusState>('menus');

export const selectMenus: MemoizedSelector<object, Menu[]> = createSelector(
  selectMenusState,
  (state: MenusState) => {
    if (state.menus.length) {
      return state.menus.map((menu) => ({...menu, link: menu.link || ''}));
    }
    return state.menus;
  }
);

export const selectMenuDetails = createSelector(
  (state: MenusState) => state.menuDetails,
  (menuDetails) => ({...menuDetails, link: menuDetails?.link || ''})
);
