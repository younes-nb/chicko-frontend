import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/shared/types';
import {Store} from "@ngrx/store";
import {selectAuthUser} from "../../core/store/auth/auth.selectors";
import * as AuthActions from "../../core/store/auth/auth.actions"

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
  });

  constructor(
    private authStore: Store<{ auth: { user: User } }>
  ) {
  }

  onSubmit() {
    const username = this.accountForm.controls['username'].value;
    const email = this.accountForm.controls['email'].value;
    const phone_number = this.accountForm.controls['phone_number'].value;
    const first_name = this.accountForm.controls['first_name'].value;
    const last_name = this.accountForm.controls['last_name'].value;
    const password = this.accountForm.controls['password'].value;
    this.authStore.dispatch(AuthActions.updateUser({username, email, phone_number, first_name, last_name, password}))
  }
}
