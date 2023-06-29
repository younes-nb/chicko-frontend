import {createAction, props} from "@ngrx/store";
import {Plan} from "../../../shared/types";

export const fetchPlans = createAction('[Plans] Fetch Plans');

export const fetchPlansFailure = createAction(
  '[Plans] Fetch Plans Failure'
);

export const setPlans = createAction(
  '[Menus] Set Plans',
  props<{ plans: Plan[] }>()
);
