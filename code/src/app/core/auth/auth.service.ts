import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API: string = 'http://localhost:8000/account/';
const httpOptions = {
  headers: new HttpHeaders({Authorization: '', 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(username: string, password: string, phone_number: string, email: string): Observable<any> {
    return this.http.post(AUTH_API + 'register/', JSON.stringify({
      username,
      password,
      phone_number,
      email
    }), httpOptions);
  }

  verify(code: string) {
    return this.http.post(AUTH_API + 'verify/', JSON.stringify({code}), httpOptions)
  }
}
