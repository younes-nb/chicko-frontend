import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/auth.service";
import {StorageService} from "../../../shared/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['profile'])
    }
  }

  onSubmit(): void {
    this.authService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value,
    ).subscribe({
      next: (data: any) => {
        this.storageService.saveUser(data);
        this.router.navigate(['profile'])
      },
      error: (err: any) => {
        this.openSnackBar('مشکلی پیش آمده است.');
        console.log(err)
      }
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {horizontalPosition: "end", verticalPosition: "top", duration: 8000});
  }
}
