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
    password: string,
    profile_image: string
  ): Observable<User> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone_number', phone_number);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('password', password);
    formData.append('profile_image', profile_image);
    return this.httpClient
      .put<User>(
        `${BASE_API}auth/users/me/`,
        formData,
        {headers: {NeedsUserTokenHeader: ''}}
      )
  }
}
