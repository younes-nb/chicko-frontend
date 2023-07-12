import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BASE_API} from '../shared/url';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MenusService {

  constructor(private httpClient: HttpClient) {
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
        {name, theme: {name: 'پیش فرض'}},
        {
          headers: {NeedsUserTokenHeader: ''},
        }
      );
  }

  public updateMenu(id: string, name: string, telephone?: string, phone?: string, address?: string, is_active?: boolean): Observable<any> {
    return this.httpClient.put(`${BASE_API}menu/menus/${id}`, {
      name,
      telephone,
      phone,
      address,
      is_active
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

  public updateTheme(id: string, name: string, font_family?: string, menu_background_color?: string, menu_text_color?: string, header_color?: string, menu_item_background_color?: string, logo_image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    if (font_family) formData.append('font_family', font_family);
    if (menu_background_color) formData.append('menu_background_color', menu_background_color);
    if (menu_text_color) formData.append('menu_text_color', menu_text_color);
    if (header_color) formData.append('header_color', header_color);
    if (menu_item_background_color) formData.append('menu_item_background_color', menu_item_background_color);
    if (logo_image) formData.append('logo_image', logo_image);
    return this.httpClient.put(`${BASE_API}theme/themes/${id}/`, formData, {headers: {NeedsUserTokenHeader: ''}});
  }
}
