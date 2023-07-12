import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectUserPlans} from "../../core/store/plans/plans.selectors";
import * as PlanActions from "../../core/store/plans/plans.actions"

@Component({
  selector: 'app-user-plans',
  templateUrl: './user-plans.component.html',
  styleUrls: ['./user-plans.component.scss']
})
export class UserPlansComponent {
  userPlans$ = this.store.select(selectUserPlans);
  displayedColumns: string[] = ['start_date', 'end_date', 'is_active']

  constructor(private store: Store) {
  }

  activePlan(user_plan_id: string) {
    this.store.dispatch(PlanActions.createOrder({user_plan_id}));
  }
}
