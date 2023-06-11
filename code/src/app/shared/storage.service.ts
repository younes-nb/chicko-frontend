import {Injectable} from '@angular/core';
import {UsersService} from '../users/users.service';

const USER_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private usersService: UsersService) {
  }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.usersService.fetchUser().subscribe();
  }

  public getUserToken(): string {
    const userToken = window.sessionStorage.getItem(USER_KEY);
    if (userToken) {
      return 'Token ' + JSON.parse(userToken).auth_token;
    }
    return '';
  }

  public isLoggedIn(): boolean {
    return window.sessionStorage.getItem(USER_KEY) !== null;
  }
}
