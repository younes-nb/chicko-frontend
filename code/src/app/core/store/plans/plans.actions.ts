import {createAction, props} from "@ngrx/store";
import {Plan, UserPlan} from "../../../shared/types";

export const fetchPlans = createAction('[Plans] Fetch Plans');

export const fetchPlansFailure = createAction(
  '[Plans] Fetch Plans Failure'
);

export const setPlans = createAction(
  '[Plans] Set Plans',
  props<{ plans: Plan[] }>()
);

export const fetchUserPlans = createAction(
  '[User Plans] Fetch User Plans',
  props<{ user_id: string }>()
);

export const fetchUserPlansFailure = createAction(
  '[User Plans] Fetch User Plans Failure'
);

export const setUserPlans = createAction(
  '[User Plans] Set User Plans',
  props<{ userPlans: UserPlan[] }>()
);
