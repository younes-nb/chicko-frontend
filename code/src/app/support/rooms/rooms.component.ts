import { Component, Inject, OnInit } from '@angular/core';
import { SupportService } from '../support.service';
import { ChatUser, Room, RoomDialogData } from '../../shared/types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  constructor(
    private supportService: SupportService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateUserRooms();
  }

  getUser(): ChatUser {
    return this.supportService.user;
  }

  getUserRooms(): Room[] {
    return this.supportService.userRooms;
  }

  updateUserRooms(): void {
    this.supportService.getUserRooms(
      this.supportService.user._id,
      this.supportService.user.email
    );
  }

  signout(): void {
    this.supportService.signout();
  }

  openCreateRoomDialog(): void {
    const dialogRef = this.dialog.open(RoomDialog, {
      data: {
        title: 'افزودن گفتگوی جدید',
        label: 'عنوان گفتگو',
      },
    });
    dialogRef.afterClosed().subscribe((title) => {
      if (title) {
        this.supportService.createRoom(this.getUser()._id, title);
      }
    });
  }

  openJoinRoomDialog(): void {
    const dialogRef = this.dialog.open(RoomDialog, {
      data: {
        title: 'پیوستن به گفتگو',
        label: 'شناسه گفتگو',
      },
    });
    dialogRef.afterClosed().subscribe((roomId) => {
      if (roomId) {
        this.supportService.joinRoom(this.getUser()._id, roomId);
      }
    });
  }

  startChat(room: Room): void {
    this.supportService.currentRoom = room;
    this.supportService.getRoomHistory(room._id);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.supportService.userRooms,
      event.previousIndex,
      event.currentIndex
    );
  }
}

@Component({
  selector: 'app-room-dialog',
  templateUrl: 'room-dialog.html',
})
export class RoomDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RoomDialogData) {}

  roomForm: FormGroup = new FormGroup({
    input: new FormControl('', Validators.required),
  });
}
