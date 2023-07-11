import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PlansService} from "../../../users/plans.service";
import * as PlanActions from './plans.actions'
import {map, of, switchMap} from "rxjs";
import {Plan, UserPlan} from "../../../shared/types";
import {catchError} from "rxjs/operators";
import {CustomSnackBarService} from "../../../shared/custom-snack-bar.service";

@Injectable()
export class PlansEffects {
  fetchPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.fetchPlans),
      switchMap(() =>
        this.plansService.fetchPlans().pipe(
          map((plans: Plan[]) => PlanActions.setPlans({plans})),
          catchError(() => {
            this.customSnackBarService.openSnackBar("ارتباط با سرور ناموفق بود.")
            return of(PlanActions.fetchPlansFailure())
          })
        )
      )
    )
  )

  fetchUserPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.fetchUserPlans),
      switchMap(({user_id}) =>
        this.plansService.fetchUserPlan(user_id).pipe(
          map((userPlans: UserPlan[]) => PlanActions.setUserPlans({userPlans})),
          catchError(() => {
            this.customSnackBarService.openSnackBar("ارتباط با سرور ناموفق بود.")
            return of(PlanActions.fetchUserPlansFailure())
          })
        )
      )
    )
  )

  createUserPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.createUserPlan),
      switchMap(({user, plan}) =>
        this.plansService.createUserPlan(user, plan).pipe(
          map((userPlan: UserPlan) => PlanActions.createUserPlanSuccess({userPlan})),
          catchError(() => {
            this.customSnackBarService.openSnackBar("عملیات ناموفق بود.")
            return of(PlanActions.createUserPlanFailure())
          })
        )
      )
    )
  )

  constructor(private actions$: Actions, private plansService: PlansService, private customSnackBarService: CustomSnackBarService) {
  }
}
