import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PlansService} from "../../../users/plans.service";
import * as PlanActions from './plans.actions'
import {map, of, switchMap} from "rxjs";
import {Order, Plan, UserPlan} from "../../../shared/types";
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
        this.plansService.fetchUserPlans(user_id).pipe(
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

  createUserPlanSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.createUserPlanSuccess),
      switchMap(async ({userPlan}) => PlanActions.createOrder({user_plan_id: userPlan.id})
      )
    )
  )

  fetchUserOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.fetchUserOrders),
      switchMap(() =>
        this.plansService.fetchUserOrders().pipe(
          map((userOrders: Order[]) => PlanActions.fetchUserOrdersSuccess({userOrders})),
          catchError(() => {
            this.customSnackBarService.openSnackBar("ارتباط با سرور ناموفق بود.")
            return of(PlanActions.fetchUserOrdersFailure())
          })
        )
      )
    )
  )

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.createOrder),
      switchMap(({user_plan_id}) =>
        this.plansService.createOrder(user_plan_id).pipe(
          map((userOrder: Order) => PlanActions.createOrderSuccess({userOrder})),
          catchError(() => {
            this.customSnackBarService.openSnackBar("عملیات ناموفق بود.")
            return of(PlanActions.createOrderFailure())
          })
        )
      )
    )
  )

  constructor(private actions$: Actions, private plansService: PlansService, private customSnackBarService: CustomSnackBarService) {
  }
}
