import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BASE_API} from '../shared/api';
import {Menu, User} from '../shared/types';
import {BehaviorSubject, map, Observable, throwError} from 'rxjs';
import {UsersService} from './users.service';
import {CustomSnackBarService} from '../shared/custom-snack-bar.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private _menus: Menu[] = [];
  private menusSubject: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(
    []
  );

  constructor(
    private httpClient: HttpClient,
    private usersService: UsersService,
    private customSnackBarService: CustomSnackBarService,
    private router: Router
  ) {
  }

  public fetchMenus(): void {
    this.httpClient
      .get(`${BASE_API}menu/menus/user/`, {
        headers: {NeedsUserTokenHeader: ''},
      })
      .subscribe({
        next: (data: any) => {
          this._menus = data;
          this.menusSubject.next(this._menus);
        },
        error: () => {
          this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }

  public getMenus(): Observable<Menu[]> {
    return this.menusSubject.asObservable();
  }

  public createMenu(name: string): void {
    this.httpClient
      .post(
        `${BASE_API}menu/menus/user/`,
        {name},
        {
          headers: {NeedsUserTokenHeader: ''},
        }
      )
      .subscribe({
        next: () => {
          this.fetchMenus();
        },
        error: () => {
          this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }

  generateMenuLink(menuId: string): Observable<string> {
    return this.usersService.currentUser$.pipe(
      map((user: User) => {
        if (user) {
          return `/menu/${user.username}/${menuId}`;
        } else {
          this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.');
          this.router.navigate(['/home'])
          return '';
        }
      })
    );
  }
}
