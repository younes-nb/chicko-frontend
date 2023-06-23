import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BASE_API} from '../shared/api';
import {Theme, User} from '../shared/types';
import {map, Observable} from 'rxjs';
import {UsersService} from '../users/users.service';
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

  public updateMenu(id: string, name: string, theme?: Theme, telephone?: string, phone?: string, address?: string): Observable<any> {
    return this.httpClient.put(`${BASE_API}menu/menus/${id}`, {
      name,
      theme,
      telephone,
      phone,
      address
    }, {headers: {NeedsUserTokenHeader: ''}})
  }

  public deleteMenu(id: string): Observable<any> {
    return this.httpClient.delete(`${BASE_API}menu/menus/${id}`, {headers: {NeedsUserTokenHeader: ''}});
  }

  public createCategory(name: string, menu: string): Observable<any> {
    return this.httpClient.post(`${BASE_API}menu/menus/categories/create/`, {
      name,
      menu
    }, {headers: {NeedsUserTokenHeader: ''}});
  }

  public updateCategory(id: string, name: string, menu: string): Observable<any> {
    return this.httpClient.put(`${BASE_API}menu/categories/${id}/`, {
      id,
      name,
      menu
    }, {headers: {NeedsUserTokenHeader: ''}});
  }

  public deleteCategory(id: string): Observable<any> {
    return this.httpClient.delete(`${BASE_API}menu/categories/${id}/`, {
      headers: {NeedsUserTokenHeader: ''},
      body: {category_pk: id}
    });
  }

  public createMenuItem(
    name: string,
    menu: string,
    category: string,
    image: File,
    is_available: boolean,
    description?: string,
    price?: string,
    discount?: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('menu', menu);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('is_available', is_available.toString());
    if (description) formData.append('description', description);
    if (price) formData.append('price', price);
    if (discount) formData.append('discount', discount);

    return this.httpClient.post(
      `${BASE_API}menu/menus/menuitems/create/`,
      formData,
      {
        headers: {NeedsUserTokenHeader: ''},
      }
    );
  }

  public updateMenuItem(
    id: string,
    name: string,
    menu: string,
    category: string,
    is_available: boolean,
    image?: File,
    description?: string,
    price?: string,
    discount?: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('menu', menu);
    formData.append('category', category);
    formData.append('is_available', is_available.toString());
    if (image) formData.append('image', image);
    if (description) formData.append('description', description);
    if (price) formData.append('price', price);
    if (discount) formData.append('discount', discount);

    return this.httpClient.put(
      `${BASE_API}menu/menu-item/${id}/`,
      formData,
      {
        headers: {NeedsUserTokenHeader: ''},
      }
    );
  }

  public deleteMenuItem(id: string): Observable<any> {
    return this.httpClient.delete(`${BASE_API}menu/menu-item/${id}/`, {
      headers: {NeedsUserTokenHeader: ''},
      body: {menu_item_pk: id}
    })
  }

  public fetchThemes(): Observable<any> {
    return this.httpClient.get(`${BASE_API}theme/themes/`, {headers: {NeedsUserTokenHeader: ''}});
  }

  public createTheme(name: string, font_family?: string, menu_background_color?: string, menu_text_color?: string, header_color?: string, logo_image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    if (font_family) formData.append('font_family', font_family);
    if (menu_background_color) formData.append('menu_background_color', menu_background_color);
    if (menu_text_color) formData.append('menu_text_color', menu_text_color);
    if (header_color) formData.append('header_color', header_color);
    if (logo_image) formData.append('logo_image', logo_image);
    return this.httpClient.post(`${BASE_API}theme/themes/`, formData, {headers: {NeedsUserTokenHeader: ''}});
  }

  public updateTheme(id: string, name: string, font_family?: string, menu_background_color?: string, menu_text_color?: string, header_color?: string, logo_image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    if (font_family) formData.append('font_family', font_family);
    if (menu_background_color) formData.append('menu_background_color', menu_background_color);
    if (menu_text_color) formData.append('menu_text_color', menu_text_color);
    if (header_color) formData.append('header_color', header_color);
    if (logo_image) formData.append('logo_image', logo_image);
    return this.httpClient.put(`${BASE_API}theme/themes/${id}/`, formData, {headers: {NeedsUserTokenHeader: ''}});
  }

  public deleteTheme(id: string): Observable<any> {
    return this.httpClient.delete(`${BASE_API}theme/themes/${id}/`, {
      headers: {NeedsUserTokenHeader: ''},
      body: {theme_pk: id}
    })
  }
}
