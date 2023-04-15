import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SupportService} from "../support.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChatUser, Message, Room} from "../../shared/types";
import {WebSocketService} from "../web-socket.service";
import {numLatinToFa} from 'src/app/shared/utils';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageBox') messageBox!: HTMLUListElement;
  isShowingEmojiPicker: boolean = false;
  messageForm: FormGroup = new FormGroup({
    message: new FormControl('')
  });

  constructor(private supportService: SupportService, private webSocketService: WebSocketService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.webSocketService.open(this.getRoom()._id, this.getUser()._id);
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

  sendMessage(): void {
    this.webSocketService.sendMessage(this.getUser()._id, this.getRoom()._id, this.messageForm.controls['message'].value);
    this.messageForm.controls['message'].setValue('');
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
    this.webSocketService.close();
    this.supportService.currentRoomHistory = [];
    this.supportService.currentRoom = {} as Room;
    this.supportService.currenRoomUsers = []
    this.supportService.lastMessage = {} as Message;
    this.supportService.component = 'rooms';
  }

  handleEmoji(event: { char: string; }) {
    this.messageForm.controls['message'].setValue(this.messageForm.controls['message'].value + event.char);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {horizontalPosition: "end", verticalPosition: "top", duration: 8000});
  }

  numLatinToFa(num: string): string {
    return numLatinToFa(num);
  }
}
