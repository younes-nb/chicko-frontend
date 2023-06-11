import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API} from '../shared/api';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {User} from '../shared/types';
import {CustomSnackBarService} from "../shared/custom-snack-bar.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<any>(
    null
  );
  public currentUser$: Observable<User> =
    this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router, private customSnackBarService: CustomSnackBarService) {
  }

  public fetchUser(): Observable<User> {
    return this.httpClient
      .get(`${BASE_API}auth/users/me/`, {
        headers: {NeedsUserTokenHeader: ''},
      })
      .pipe(
        tap((data: any) => {
          this.currentUserSubject.next(data);
        }),
        catchError((error: any): Observable<any> => {
          console.error('Error fetching user:', error);
          this.router.navigate(['/home']).then(() => {
            this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.')
          });
          return throwError(error);
        })
      );
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
      .pipe(
        tap((data: User) => {
          this.currentUserSubject.next(data);
        })
      );
  }
}
