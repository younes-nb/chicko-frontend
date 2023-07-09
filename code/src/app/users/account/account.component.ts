import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/shared/types';
import {Store} from "@ngrx/store";
import {selectAuthUser} from "../../core/store/auth/auth.selectors";
import * as AuthActions from "../../core/store/auth/auth.actions"
import {ImageDialogComponent} from "../../shared/image-dialog/image-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  submitted: boolean = false;
  hidePassword: boolean = true;
  errors: Map<string, string> = new Map();
  user$ = this.authStore.select(selectAuthUser);

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
    profile_image: new FormControl('')
  });

  constructor(
    private authStore: Store<{ auth: { user: User } }>,
    private dialog: MatDialog
  ) {
  }

  onSubmit() {
    const props = {
      username: this.accountForm.controls['username'].value,
      email: this.accountForm.controls['email'].value,
      phone_number: this.accountForm.controls['phone_number'].value,
      first_name: this.accountForm.controls['first_name'].value,
      last_name: this.accountForm.controls['last_name'].value,
      password: this.accountForm.controls['password'].value,
      profile_image: this.accountForm.controls['profile_image'].value
    }
    this.authStore.dispatch(AuthActions.updateUser(props))
  }

  openShowProfileImageDialog(profileImage: string): void {
    this.dialog.open(ImageDialogComponent, {data: {image: profileImage}});
  }
}
