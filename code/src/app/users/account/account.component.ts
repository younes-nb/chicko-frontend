import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/types';
import { CustomeSnackBarService } from 'src/app/shared/custome-snack-bar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  submitted: boolean = false;
  hidePassword: boolean = true;
  errors: Map<string, string> = new Map();
  currentUser$: Observable<User> = {} as Observable<User>;

  accountForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.maxLength(20)]),
    last_name: new FormControl('', [Validators.maxLength(30)]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('09[0-9]{9}'),
    ]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(128),
    ]),
  });

  constructor(
    private usersService: UsersService,
    private customeSnackBarService: CustomeSnackBarService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.usersService.currentUser$;
  }

  onSubmit() {
    this.usersService
      .updateUser(
        this.accountForm.controls['username'].value,
        this.accountForm.controls['email'].value,
        this.accountForm.controls['phone_number'].value,
        this.accountForm.controls['first_name'].value,
        this.accountForm.controls['last_name'].value,
        this.accountForm.controls['password'].value
      )
      .subscribe({
        next: () => {
          this.customeSnackBarService.openSnackBar(
            'اطلاعات حساب شما به روز شد.'
          );
        },
        error: () => {
          this.customeSnackBarService.openSnackBar('مشکلی پیش آمده است.');
        },
      });
  }
}
