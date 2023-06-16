import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {UsersService} from './users.service';
import {User} from '../shared/types';
import {Store} from "@ngrx/store";
import * as AuthActions from "../core/store/auth/auth.actions"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  user: User = {} as User;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private authStore: Store<{ auth: { user: User } }>
  ) {
  }

  ngOnInit(): void {
    this.authStore.select('auth', 'user').subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authStore.dispatch(AuthActions.logout());
  }
}
