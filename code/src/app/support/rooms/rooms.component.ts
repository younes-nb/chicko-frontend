import {Component, Inject, OnInit} from '@angular/core';
import {SupportService} from "../support.service";
import {ChatUser, Room, RoomDialogData} from "../../shared/types";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  constructor(private supportService: SupportService, private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updateUserRooms()
  }

  getUser(): ChatUser {
    return this.supportService.user;
  }

  getUserRooms(): Room[] {
    return this.supportService.userRooms;
  }

  updateUserRooms(): void {
    this.supportService.getUserRooms(this.supportService.user._id, this.supportService.user.email).subscribe({
      next: data => {
        data.data.map((room: any) => {
          room.createdAt = new Date(Date.parse(room.createdAt));
          room.updatedAt = new Date(Date.parse(room.updatedAt));
        });
        this.supportService.userRooms = data.data;
      },
      error: () => {
        this.openSnackBar('مشکلی پیش آمده است.');
      }
    })
  }

  signout(): void {
    this.supportService.signout();
  }

  openCreateRoomDialog(): void {
    const dialogRef = this.dialog.open(RoomDialog, {
      data: {
        title: 'افزودن گفتگوی جدید',
        label: 'عنوان گفتگو'
      }
    });
    dialogRef.afterClosed().subscribe(title => {
      if (title) {
        this.supportService.createRoom(this.getUser()._id, title).subscribe({
          next: () => {
            this.updateUserRooms();
          },
          error: () => {
            this.openSnackBar('مشکلی پیش آمده است.');
          }
        });
      }
    });
  }

  openJoinRoomDialog(): void {
    const dialogRef = this.dialog.open(RoomDialog, {
      data: {
        title: 'پیوستن به گفتگو',
        label: 'شناسه گفتگو'
      }
    });
    dialogRef.afterClosed().subscribe(roomId => {
      if (roomId) {
        this.supportService.joinRoom(this.getUser()._id, roomId).subscribe({
          next: () => {
            this.updateUserRooms();
          },
          error: () => {
            this.openSnackBar('مشکلی پیش آمده است.');
          }
        });
      }
    });
  }

  startChat(room: Room): void {
    this.supportService.currentRoom = room;
    this.supportService.getRoomHistory(room._id).subscribe({
      next: roomData => {
        if (roomData.data) {
          roomData.data.map((message: any) => {
            message.time = new Date(Date.parse(message.time));
            message.isCurrentUser = message.user_id === this.supportService.user._id;
            if (this.supportService.lastMessage.user_id !== message.user_id) {
              message.isFirst = true;
            }
            if (this.supportService.lastMessage.time === undefined || this.supportService.lastMessage.time.getFullYear() !== message.time.getFullYear() || this.supportService.lastMessage.time.getMonth() !== message.time.getMonth() || this.supportService.lastMessage.time.getDay() !== message.time.getDay()) {
              message.showDate = true;
            }
            this.supportService.lastMessage = message;
          });
        }
        this.supportService.currentRoomHistory = roomData.data;
        this.supportService.getRoomUsersDetails(this.supportService.currentRoom.users, this.supportService.currentRoom._id).subscribe({
          next: data => {
            this.supportService.currenRoomUsers = data.users;
            this.supportService.component = 'chat';
          },
          error: () => {
            this.openSnackBar('مشکلی پیش آمده است.');
          }
        });
      },
      error: () => {
        this.openSnackBar('مشکلی پیش آمده است.');
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.supportService.userRooms, event.previousIndex, event.currentIndex);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {horizontalPosition: "end", verticalPosition: "top", duration: 8000});
  }
}

@Component({
  selector: 'app-room-dialog',
  templateUrl: 'room-dialog.html',
})
export class RoomDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: RoomDialogData) {
  }

  roomForm: FormGroup = new FormGroup({
    input: new FormControl('', Validators.required),
  });
}
