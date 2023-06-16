import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BASE_API} from '../shared/api';
import {User} from '../shared/types';
import {map, Observable} from 'rxjs';
import {UsersService} from './users.service';
import {CustomSnackBarService} from '../shared/custom-snack-bar.service';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectAuthUser} from "../core/store/auth/auth.selectors";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  user$: Observable<User | null>;
  user: User = {} as User;

  constructor(
    private httpClient: HttpClient,
    private usersService: UsersService,
    private customSnackBarService: CustomSnackBarService,
    private router: Router,
    private authStore: Store<{ auth: { user: User } }>
  ) {
    this.user$ = this.authStore.select(selectAuthUser);
    this.user$.pipe(
      map((user: User | null) => {
        if (user) {
          this.user = user;
        }
      }),
      catchError((error) => {
        console.log(error);
        throw error;
      })
    );
  }

  public fetchMenus(): Observable<any> {
    return this.httpClient
      .get(`${BASE_API}menu/menus/user/`, {
        headers: {NeedsUserTokenHeader: ''},
      });
  }

  public fetchMenu(id: string): Observable<any> {
    return this.httpClient
      .get(`${BASE_API}menu/menus/${id}`, {
        headers: {NeedsUserTokenHeader: ''},
      });
  }

  public createMenu(name: string): Observable<any> {
    return this.httpClient
      .post(
        `${BASE_API}menu/menus/user/`,
        {name},
        {
          headers: {NeedsUserTokenHeader: ''},
        }
      );
  }
}
