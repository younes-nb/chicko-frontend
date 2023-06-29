import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_API} from './url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_TOKEN_KEY: string = 'Token';

  constructor(
    private http: HttpClient,
  ) {
  }

  public register(
    username: string,
    password: string,
    phone_number: string,
    email: string
  ): Observable<any> {
    return this.http.post(`${BASE_API}account/register/`, {
        username,
        password,
        phone_number,
        email,
      },
      {
        headers: {'Accept-Language': 'fa'},
      });
  }

  public verify(code: string): Observable<any> {
    return this.http.post(`${BASE_API}account/verify/`, {
      code,
    });
  }

  public login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        `
      ${BASE_API}auth/token/login/`,
        {username, password}
      );
  }

  public logout(): Observable<any> {
    return this.http
      .post(
        `${BASE_API}auth/token/logout/`,
        {},
        {
          headers: {NeedsUserTokenHeader: ''},
        }
      );
  }

  isLoggedIn() {
    return window.localStorage.getItem(this.USER_TOKEN_KEY) !== null;
  }

  setToken(token: string): void {
    this.removeToken();
    window.localStorage.setItem(this.USER_TOKEN_KEY, token);
  }

  removeToken(): void {
    window.localStorage.removeItem(this.USER_TOKEN_KEY);
  }

  getToken(): string {
    return window.localStorage.getItem(this.USER_TOKEN_KEY) || '';
  }
}
