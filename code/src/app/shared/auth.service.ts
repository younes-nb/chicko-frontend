import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API } from './api';
import { StorageService } from './storage.service';
import { CustomeSnackBarService } from './custome-snack-bar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private customeSnackBarService: CustomeSnackBarService
  ) {}

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
      headers: { 'Accept-Language': 'fa' },
    });
  }

  public verify(code: string): Observable<any> {
    return this.http.post(`${BASE_API}account/verify/`, {
      code,
    });
  }

  public login(username: string, password: string): void {
    this.http
      .post(
        `
      ${BASE_API}auth/token/login/`,
        { username, password }
      )
      .subscribe({
        next: (data: any) => {
          this.storageService.saveUser(data);
          this.router.navigate(['dashboard']);
        },
        error: () => {
          this.customeSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }

  public logout() {
    this.http
      .post(
        `${BASE_API}auth/token/logout/`,
        {},
        {
          headers: { NeedsUserTokenHeader: '' },
        }
      )
      .subscribe({
        next: () => {
          this.storageService.clean();
          window.location.reload();
        },
        error: () => {
          this.customeSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }
}
