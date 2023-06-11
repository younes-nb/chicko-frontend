import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {UsersService} from './users.service';
import {User} from '../shared/types';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  currentUser$: Observable<User> = {} as Observable<User>;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.usersService.currentUser$;
  }

  logout() {
    this.authService.logout();
  }
}
