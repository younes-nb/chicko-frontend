import { Component, OnInit } from '@angular/core';
import { SupportService } from '../support.service';
import { ChatUser, Room } from '../../shared/types';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SingleInputDialogComponent } from 'src/app/shared/single-input-dialog/single-input-dialog.component';

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
    const dialogRef = this.dialog.open(SingleInputDialogComponent, {
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
    const dialogRef = this.dialog.open(SingleInputDialogComponent, {
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
