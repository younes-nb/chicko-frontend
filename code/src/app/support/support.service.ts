import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const CHAT_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private http: HttpClient) {
  }

  public register(email: string, name?: string): Observable<any> {
    return this.http.post(CHAT_API + 'start/', {email, name}, httpOptions)
  }
}
