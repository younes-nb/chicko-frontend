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
import {Category, Menu, MenuItem} from "../../../shared/types";
import {BASE_URL} from "../../../shared/api";
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
              link: `${BASE_URL}/menus/${menu.id}`,
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
            link: `${BASE_URL}/menus/${menu.id}`,
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
            link: `${BASE_URL}/menus/${menu.id}`,
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


  constructor(
    private actions$: Actions,
    private menusService: MenusService,
    private router: Router
  ) {
  }
}
