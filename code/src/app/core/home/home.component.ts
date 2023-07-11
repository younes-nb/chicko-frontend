import {Component} from '@angular/core';
import {scrollTo} from '../../shared/utils';
import {Store} from "@ngrx/store";
import {selectPlans} from "../store/plans/plans.selectors";
import {Plan} from "../../shared/types";
import {MatDialog} from "@angular/material/dialog";
import {PlanRegisterDialogComponent} from "../../users/plan-register-dialog/plan-register-dialog.component";
import {selectAuthUser} from "../store/auth/auth.selectors";
import {CustomSnackBarService} from "../../shared/custom-snack-bar.service";
import * as PlanActions from "../store/plans/plans.actions"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  plans$ = this.store.select(selectPlans);
  user$ = this.store.select(selectAuthUser);

  constructor(private store: Store, private dialog: MatDialog, private customSnackBarService: CustomSnackBarService) {
  }

  openRegisterPlanDialog(plan: Plan) {
    this.user$.subscribe((user) => {
      if (user) {
        const dialogRef = this.dialog.open(PlanRegisterDialogComponent, {
          data: plan
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.store.dispatch(PlanActions.createUserPlan({user: user.id, plan: plan.id}));
          }
        })
      } else {
        this.customSnackBarService.openSnackBar('ابتدا وارد حساب کاربری خود شوید.');
      }
    });
  }

  scrollTo(fragment: string) {
    scrollTo(fragment);
  }
}
