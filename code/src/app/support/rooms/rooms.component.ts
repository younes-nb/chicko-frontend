import {Component, OnInit} from '@angular/core';
import {SupportService} from "../support.service";
import {ChatUser, Room} from "../../shared/types";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRoomDialog);
    dialogRef.afterClosed().subscribe(title => {
      this.supportService.createRoom(this.getUser()._id, title).subscribe({
        next: () => {
          this.updateUserRooms();
        },
        error: () => {
          this.openSnackBar('مشکلی پیش آمده است.');
        }
      })
    })
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {horizontalPosition: "end", verticalPosition: "top", duration: 8000});
  }
}

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: 'create-room-dialog.html',
})
export class CreateRoomDialog {
  createRoomForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });
}
