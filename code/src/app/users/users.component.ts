import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {UsersService} from './users.service';
import {User} from '../shared/types';
import {Store} from "@ngrx/store";
import * as AuthActions from "../core/store/auth/auth.actions"
import * as PlanActions from "../core/store/plans/plans.actions";
import {selectUserPlans} from "../core/store/plans/plans.selectors";
import {selectAuthUser} from "../core/store/auth/auth.selectors";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  user: User = {} as User;
  userPlans$ = this.store.select(selectUserPlans);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe((user) => {
      if (user) {
        this.user = user;
        this.store.dispatch(PlanActions.fetchUserPlans({user_id: this.user.id}));
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
