import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Menu, MenuDetails, Theme} from "../../../shared/types";
import {MenusState} from "./menus.state";

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

export const selectThemes: MemoizedSelector<object, Theme[]> = createSelector(
  selectMenusState,
  (state: MenusState) => state.themes
)

export const selectMenuDetailsState: MemoizedSelector<object, MenuDetails> = createFeatureSelector<MenuDetails>('menuDetails');
export const selectMenuDetails = createSelector(
  selectMenuDetailsState,
  (menuDetails) => ({...menuDetails, link: menuDetails?.link || ''})
);
