import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  map,
  mergeMap,
  catchError, tap, switchMap,
} from 'rxjs/operators';
import {MenusService} from '../../../users/menus.service';
import * as MenuActions from './menus.actions';
import {of} from "rxjs";
import {Menu} from "../../../shared/types";
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


  constructor(
    private actions$: Actions,
    private menusService: MenusService,
    private router: Router
  ) {
  }
}