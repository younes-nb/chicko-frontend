import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API } from './api';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public register(
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    phone_number: string,
    email: string
  ): Observable<any> {
    return this.http.post(`${BASE_API}account/register/`, {
      first_name,
      last_name,
      username,
      password,
      phone_number,
      email,
    });
  }

  public verify(code: string): Observable<any> {
    return this.http.post(`${BASE_API}account/verify/`, {
      code,
    });
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(
      `
      ${BASE_API}auth/token/login/`,
      { username, password }
    );
  }

  public logout(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.storageService.getUserToken(),
      }),
    };
    return this.http.post(`${BASE_API}auth/token/logout/`, {}, httpOptions);
  }
}
