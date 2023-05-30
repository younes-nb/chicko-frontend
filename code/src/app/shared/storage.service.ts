import { Injectable } from '@angular/core';

const USER_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserToken(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return 'Token ' + JSON.parse(user).auth_token;
    }
    return {};
  }

  public isLoggedIn(): boolean {
    return window.sessionStorage.getItem(USER_KEY) !== null;
  }
}
