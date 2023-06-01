import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API } from '../shared/api';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();
  constructor(private httpClient: HttpClient) {}

  public fetchUser(): Observable<any> {
    return this.httpClient
      .get(`${BASE_API}auth/users/me/`, {
        headers: { NeedsUserTokenHeader: '' },
      })
      .pipe(
        tap((data: any) => {
          this.currentUserSubject.next(data);
        })
      );
  }
}
