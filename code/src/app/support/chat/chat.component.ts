import {Component} from '@angular/core';
import {SupportService} from "../support.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChatUser, Message, Room} from "../../shared/types";
import {WebSocketService} from "../web-socket.service";
import {numLatinToFa} from 'src/app/shared/utils';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  message: string = '';
  isShowingEmojiPicker: boolean = false;

  constructor(private supportService: SupportService, private webSocketService: WebSocketService, private snackBar: MatSnackBar) {
  }

  getMessages(): Message[] {
    return this.supportService.currentRoomHistory;
  }

  getRoom(): Room {
    return this.supportService.currentRoom;
  }

  getUser(): ChatUser {
    return this.supportService.user;
  }

  back(): void {
    this.supportService.currentRoom = {} as Room;
    this.supportService.currenRoomUsers = []
    this.supportService.lastMessage = {} as Message;
    this.supportService.component = 'rooms';
  }

  handleEmoji(event: { char: string; }) {
    this.message += event.char;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {horizontalPosition: "end", verticalPosition: "top", duration: 8000});
  }

  numLatinToFa(num: string): string {
    return numLatinToFa(num);
  }
}
