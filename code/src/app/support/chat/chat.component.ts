import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {SupportService} from '../support.service';
import {ChatUser, Message, Room} from '../../shared/types';
import {WebSocketService} from '../web-socket.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('messageBox') messageBox!: ElementRef;
  messageForm: FormGroup = new FormGroup({
    message: new FormControl(''),
  });
  isShowingEmojiPicker: boolean = false;

  constructor(
    private supportService: SupportService,
    private webSocketService: WebSocketService,
  ) {
  }

  ngOnInit(): void {
    this.webSocketService.open(this.getRoom()._id, this.getUser()._id);
  }

  ngAfterViewInit(): void {
    this.messageBox.nativeElement.scrollTop =
      this.messageBox.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

  sendMessage(): void {
    this.webSocketService.sendMessage(
      this.getUser()._id,
      this.getRoom()._id,
      this.messageForm.controls['message'].value
    );
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
    this.supportService.currenRoomUsers = [];
    this.supportService.lastMessage = {} as Message;
    this.supportService.component = 'rooms';
  }

  sendEmoji(event: any) {
    this.messageForm.controls['message'].setValue(this.messageForm.controls['message'].value + event.emoji.native);
  }
}
