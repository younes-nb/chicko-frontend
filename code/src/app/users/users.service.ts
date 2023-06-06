import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API } from '../shared/api';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<any>(
    null
  );
  public currentUser$: Observable<User> =
    this.currentUserSubject.asObservable();
  constructor(private httpClient: HttpClient) {}

  public fetchUser(): Observable<User> {
    return this.httpClient
      .get(`${BASE_API}auth/users/me/`, {
        headers: { NeedsUserTokenHeader: '' },
      })
      .pipe(
        tap((data: any) => {
          console.log(data);
          this.currentUserSubject.next(data);
        })
      );
  }
}
