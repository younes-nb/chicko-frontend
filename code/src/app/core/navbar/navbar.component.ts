import {Component, OnInit} from '@angular/core';
import {scrollTo} from "../../shared/utils";
import {StorageService} from "../../shared/storage.service";
import {AuthService} from "../../shared/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../shared/types";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  currentUser: User = {} as User;
  isLoggedIn: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  scrollTo(fragment: string) {
    scrollTo(fragment);
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
