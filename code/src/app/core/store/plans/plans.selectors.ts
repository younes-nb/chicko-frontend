import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {PlansState} from "./plans.state";
import {Plan, UserPlan} from "../../../shared/types";

export const selectPlansState: MemoizedSelector<object, PlansState> = createFeatureSelector<PlansState>('plans');

export const selectPlans: MemoizedSelector<object, Plan[]> = createSelector(
  selectPlansState,
  (state: PlansState) => state.plans
)

export const selectUserPlans: MemoizedSelector<object, UserPlan[]> = createSelector(
  selectPlansState,
  (state: PlansState) => state.userPlans
)
