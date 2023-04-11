import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ChatUser, Room} from "../shared/types";

const CHAT_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  isUserRegistered: boolean = false;
  user: ChatUser = {} as ChatUser;
  userRooms: Room[] = [];


  constructor(private http: HttpClient) {
  }

  public signout() {
    this.isUserRegistered = false;
    this.user = {} as ChatUser;
    this.userRooms = [];
  }

  public register(email: string, name?: string): Observable<any> {
    return this.http.post(CHAT_API + 'start/', {email, name}, httpOptions);
  }

  public getUserRooms(userId: string, email: string): Observable<any> {
    return this.http.post(CHAT_API + 'user-rooms/', {_id: userId, email}, httpOptions)
  }

  public createRoom(userId: string, title: string): Observable<any> {
    return this.http.post(CHAT_API + 'create-room/', {title, users: [userId]}, httpOptions)
  }
}
