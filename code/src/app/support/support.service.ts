import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ChatUser, Message, Room, SupportChatComponent} from "../shared/types";

const CHAT_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  user: ChatUser = {} as ChatUser;
  userRooms: Room[] = [];
  currentRoom: Room = {} as Room;
  currentRoomHistory: Message[] = [];
  currenRoomUsers: ChatUser[] = []
  component: SupportChatComponent = 'register';
  lastMessage: Message = {} as Message;


  constructor(private http: HttpClient) {
  }

  public signout() {
    this.user = {} as ChatUser;
    this.userRooms = [];
    this.component = 'register';
  }

  public formatMessage(message: any) {
    message.time = new Date(Date.parse(message.time));
    message.isCurrentUser = message.user_id === this.user._id;
    if (this.lastMessage.user_id !== message.user_id) {
      message.isFirst = true;
    }
    if (this.lastMessage.time === undefined || this.lastMessage.time.getFullYear() !== message.time.getFullYear() || this.lastMessage.time.getMonth() !== message.time.getMonth() || this.lastMessage.time.getDay() !== message.time.getDay()) {
      message.showDate = true;
    }
    this.lastMessage = message;
    return message;
  }

  public setRoomHistory(roomData: any): void {
    if (roomData.data) {
      roomData.data.map((message: any) => {
        this.formatMessage(message);
      });
      this.currentRoomHistory = [...roomData.data];
    }
  }

  public addMessage(message: any): void {
    this.currentRoomHistory.push(this.formatMessage(message));
  }

  public register(email: string, name?: string): Observable<any> {
    return this.http.post(CHAT_API + 'start/', {email, name}, httpOptions);
  }

  public getUserRooms(userId: string, email: string): Observable<any> {
    return this.http.post(CHAT_API + 'user-rooms/', {_id: userId, email}, httpOptions);
  }

  public createRoom(userId: string, title: string): Observable<any> {
    return this.http.post(CHAT_API + 'create-room/', {title, users: [userId]}, httpOptions);
  }

  public joinRoom(userId: string, roomId: string): Observable<any> {
    return this.http.post(CHAT_API + 'add-user-room/', {_id: roomId, users: [userId]}, httpOptions);
  }

  public getRoomHistory(roomId: string): Observable<any> {
    return this.http.post(CHAT_API + 'room-history/', {_id: roomId}, httpOptions);
  }

  public getRoomUsersDetails(users: string[], roomId: string): Observable<any> {
    return this.http.post(CHAT_API + 'room-user-details/', {_id: roomId, users}, httpOptions);
  }
}
