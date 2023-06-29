import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API} from '../shared/url';
import {Observable} from 'rxjs';
import {User} from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  public fetchUser(): Observable<any> {
    return this.httpClient
      .get(`${BASE_API}auth/users/me/`, {
        headers: {NeedsUserTokenHeader: ''},
      });
  }

  public updateUser(
    username: string,
    email: string,
    phone_number: string,
    first_name: string,
    last_name: string,
    password: string
  ): Observable<User> {
    return this.httpClient
      .put<User>(
        `${BASE_API}auth/users/me/`,
        {username, email, phone_number, first_name, last_name, password},
        {headers: {NeedsUserTokenHeader: ''}}
      )
  }
}
