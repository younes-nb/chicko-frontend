import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'withCredentials': 'true'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public register(username: string, password: string, phone_number: string, email: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup/',
      {
        username,
        password,
        phone_number,
        email
      },
      httpOptions
    );
  }

  public verify(code: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'verify/',
      {
        code
      },
      httpOptions)
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin/',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  public logout(): Observable<any> {
    return this.http.post(
      AUTH_API + 'signout/',
      {},
      httpOptions
    );
  }
}
