import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Store} from "@ngrx/store";
import * as AuthActions from "./core/store/auth/auth.actions"
import * as PlanActions from "./core/store/plans/plans.actions"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.store.dispatch(AuthActions.fetchUser());
    }
    this.store.dispatch(PlanActions.fetchPlans());
  }
}
