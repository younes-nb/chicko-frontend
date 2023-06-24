import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  map,
  mergeMap,
  catchError, tap, switchMap,
} from 'rxjs/operators';
import {MenusService} from '../../../menus/menus.service';
import * as MenuActions from './menus.actions';
import {of} from "rxjs";
import {Category, Menu, MenuDetails, MenuItem, Theme} from "../../../shared/types";
import {Router} from "@angular/router";

@Injectable()
export class MenuEffects {
  fetchMenus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.fetchMenus),
      mergeMap(() =>
        this.menusService.fetchMenus().pipe(
          map((menus: Menu[]) => {
            const menusWithLinks = menus.map((menu) => ({
              ...menu,
              link: `/menus/${menu.id}`,
            }));
            return MenuActions.setMenus({menus: menusWithLinks});
          }),
          catchError((error) => of(MenuActions.fetchMenusFailure({error})))
        )
      )
    )
  );

  fetchMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.fetchMenu),
      mergeMap(({menuId}) =>
        this.menusService.fetchMenu(menuId).pipe(
          map(menu => ({
            ...menu,
            link: `/menus/${menu.id}`,
          })),
          map(menuWithLink => MenuActions.setMenu({menu: menuWithLink})),
          catchError(error => of(MenuActions.fetchMenuFailure({error})))
        )
      )
    )
  );

  createMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.createMenu),
      mergeMap(({name}) =>
        this.menusService.createMenu(name).pipe(
          map((menu: Menu) => ({
            ...menu,
            link: `/menus/${menu.id}`,
          })),
          map((menuWithLink) =>
            MenuActions.createMenuSuccess({menu: menuWithLink})
          ),
          catchError((error) =>
            of(MenuActions.createMenuFailure({error: error}))
          )
        )
      )
    )
  );

  updateMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.updateMenu),
      switchMap(({id, name, theme, telephone, phone, address}) =>
        this.menusService.updateMenu(id, name, theme, telephone, phone, address).pipe(
          map((menu: MenuDetails) => MenuActions.setMenu({menu})),
          catchError((error) => of(MenuActions.updateMenuFailure({error})))
        )
      )
    )
  );

  deleteMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.deleteMenu),
      switchMap(({menuId}) =>
        this.menusService.deleteMenu(menuId).pipe(
          map(() => MenuActions.deleteMenuSuccess()),
          catchError((error) => of(MenuActions.deleteMenuFailure({error})))
        )
      ),
      tap(() => this.router.navigate(['dashboard']))
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.createCategory),
      switchMap(({name, menu}) =>
        this.menusService.createCategory(name, menu).pipe(
          map((category: Category) => MenuActions.createCategorySuccess({category})),
          catchError((error) => of(MenuActions.createCategoryFailure({error})))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.updateCategory),
      switchMap(({id, name, menu}) =>
        this.menusService.updateCategory(id, name, menu).pipe(
          map((category: Category) => MenuActions.updateCategorySuccess({category})),
          catchError((error) => of(MenuActions.updateCategoryFailure({error})))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.deleteCategory),
      switchMap(({id}) =>
        this.menusService.deleteCategory(id).pipe(
          map(() => MenuActions.deleteCategorySuccess({id})),
          catchError((error) => of(MenuActions.deleteCategoryFailure({error})))
        )
      )
    )
  );

  createMenuItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.createMenuItem),
      switchMap(({
                   name,
                   menu,
                   category,
                   image,
                   is_available,
                   description,
                   price,
                   discount
                 }) =>
        this.menusService.createMenuItem(name, menu, category, image, is_available, description, price, discount).pipe(
          map((menuItem: MenuItem) => MenuActions.createMenuItemSuccess({menuItem})),
          catchError((error) => of(MenuActions.createMenuItemFailure({error})))
        )
      )
    )
  );

  updateMenuItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.updateMenuItem),
      switchMap(({
                   id,
                   name,
                   menu,
                   category,
                   is_available,
                   image,
                   description,
                   price,
                   discount
                 }) =>
        this.menusService.updateMenuItem(id, name, menu, category, is_available, image, description, price, discount).pipe(
          map((menuItem: MenuItem) => MenuActions.updateMenuItemSuccess({menuItem})),
          catchError((error) => of(MenuActions.updateMenuItemFailure({error})))
        )
      )
    )
  );

  deleteMenuItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.deleteMenuItem),
      switchMap(({id}) =>
        this.menusService.deleteMenuItem(id).pipe(
          map(() => MenuActions.deleteMenuItemSuccess({id})),
          catchError((error) => of(MenuActions.deleteMenuItemFailure({error})))
        )
      )
    )
  );

  fetchThemes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.fetchThemes),
      switchMap(() =>
        this.menusService.fetchThemes().pipe(
          map((themes: Theme[]) => MenuActions.setThemes({themes})),
          catchError((error) => of(MenuActions.fetchThemesFailure({error})))
        )
      )
    )
  );

  createTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.createTheme),
      switchMap(({name, font_family, menu_background_color, menu_text_color, header_color, logo_image}) =>
        this.menusService.createTheme(name, font_family, menu_background_color, menu_text_color, header_color, logo_image).pipe(
          map((theme: Theme) => MenuActions.createThemeSuccess({theme})),
          catchError((error) => of(MenuActions.createThemeFailure({error})))
        )
      )
    )
  );

  updateTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.updateTheme),
      switchMap(({id, name, font_family, menu_background_color, menu_text_color, header_color, logo_image}) =>
        this.menusService.updateTheme(id, name, font_family, menu_background_color, menu_text_color, header_color, logo_image).pipe(
          map((theme: Theme) => MenuActions.updateThemeSuccess({theme})),
          catchError((error) => of(MenuActions.updateThemeFailure({error})))
        )
      )
    )
  );

  deleteTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.deleteTheme),
      switchMap(({id}) =>
        this.menusService.deleteTheme(id).pipe(
          map(() => MenuActions.deleteThemeSuccess({id})),
          catchError((error) => of(MenuActions.deleteThemeFailure({error})))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private menusService: MenusService,
    private router: Router
  ) {
  }
}
