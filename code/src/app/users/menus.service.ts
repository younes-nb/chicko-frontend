import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API } from '../shared/api';
import { Menu, User } from '../shared/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersService } from './users.service';
import { CustomeSnackBarService } from '../shared/custome-snack-bar.service';

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
    private customeSnackBarService: CustomeSnackBarService
  ) {}

  public fetchMenus(): void {
    this.httpClient
      .get(`${BASE_API}menu/menus/user/`, {
        headers: { NeedsUserTokenHeader: '' },
      })
      .subscribe({
        next: (data: any) => {
          this._menus = data;
          this.menusSubject.next(this._menus);
        },
        error: () => {
          this.customeSnackBarService.openSnackBar('مشکلی پیش آمده است.');
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
        { name },
        {
          headers: { NeedsUserTokenHeader: '' },
        }
      )
      .subscribe({
        next: () => {
          this.fetchMenus();
        },
        error: () => {
          this.customeSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }

  public generateMenuLink(menuId: string): string {
    let user: User = {} as User;
    this.usersService.currentUser$.subscribe((u: User) => {
      user = u;
    });
    return `/menu/${user.username}/${menuId}`;
  }
}
