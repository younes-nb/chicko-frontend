import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PlansService} from "../../../shared/plans.service";
import * as PlanActions from './plans.actions'
import {map, of, switchMap} from "rxjs";
import {Plan} from "../../../shared/types";
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

  constructor(private actions$: Actions, private plansService: PlansService, private customSnackBarService: CustomSnackBarService) {
  }
}
