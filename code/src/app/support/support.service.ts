import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ChatUser, Message, Room, SupportChatComponent} from '../shared/types';
import {CHAT_API} from '../shared/api';
import {CustomSnackBarService} from '../shared/custom-snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  user: ChatUser = {} as ChatUser;
  userRooms: Room[] = [];
  currentRoom: Room = {} as Room;
  currentRoomHistory: Message[] = [];
  currenRoomUsers: ChatUser[] = [];
  component: SupportChatComponent = 'register';
  lastMessage: Message = {} as Message;

  constructor(
    private http: HttpClient,
    private customSnackBarService: CustomSnackBarService
  ) {
  }

  public logout() {
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
    if (
      this.lastMessage.time === undefined ||
      this.lastMessage.time.getFullYear() !== message.time.getFullYear() ||
      this.lastMessage.time.getMonth() !== message.time.getMonth() ||
      this.lastMessage.time.getDay() !== message.time.getDay()
    ) {
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
    return this.http.post(`${CHAT_API}start/`, {
      email,
      name,
    });
  }

  public getUserRooms(userId: string, email: string): void {
    this.http
      .post(`${CHAT_API}user-rooms/`, {
        _id: userId,
        email,
      })
      .subscribe({
        next: (data: any) => {
          data.data.map((room: any) => {
            room.createdAt = new Date(Date.parse(room.createdAt));
            room.updatedAt = new Date(Date.parse(room.updatedAt));
          });
          this.userRooms = data.data;
        },
        error: () => {
          this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }

  public createRoom(userId: string, title: string): void {
    this.http
      .post(`${CHAT_API}create-room/`, {
        title,
        users: [userId],
      })
      .subscribe({
        next: () => {
          this.getUserRooms(this.user._id, this.user.email);
        },
        error: () => {
          this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }

  public joinRoom(userId: string, roomId: string): void {
    this.http
      .post(`${CHAT_API}add-user-room/`, {
        _id: roomId,
        users: [userId],
      })
      .subscribe({
        next: () => {
          this.getUserRooms(this.user._id, this.user.email);
        },
        error: () => {
          this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }

  public getRoomHistory(roomId: string): void {
    this.http
      .post(`${CHAT_API}room-history/`, {
        _id: roomId,
      })
      .subscribe({
        next: (roomData) => {
          this.setRoomHistory(roomData);
          this.getRoomUsersDetails(
            this.currentRoom.users,
            this.currentRoom._id
          );
        },
        error: () => {
          this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }

  public getRoomUsersDetails(users: string[], roomId: string): void {
    this.http
      .post(`${CHAT_API}room-user-details/`, {
        _id: roomId,
        users,
      })
      .subscribe({
        next: (data: any) => {
          this.currenRoomUsers = data.users;
          this.component = 'chat';
        },
        error: () => {
          this.customSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }
}
