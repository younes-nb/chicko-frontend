import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API } from '../shared/api';
import { Menu } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private _menus: Menu[] = [];
  constructor(private httpClient: HttpClient) {}

  public fetchMenus(): void {
    this.httpClient
      .get(`${BASE_API}menu/menus/user/`, {
        headers: { NeedsUserTokenHeader: '' },
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this._menus = data;
        },
        error: (err: any) => {
          console.log(err.message);
        },
      });
  }

  public get menus(): Menu[] {
    this.fetchMenus;
    return this._menus;
  }
}
