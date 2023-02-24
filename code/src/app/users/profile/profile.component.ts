import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/types";
import {StorageService} from "../../shared/storage.service";
import {AuthService} from "../../shared/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User = {} as User;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean();
        window.location.reload();
      },
      error: () => {
        this.openSnackBar('مشکلی پیش آمده است.');
        window.location.reload();
      }
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {horizontalPosition: "end", verticalPosition: "top", duration: 8000});
  }
}
