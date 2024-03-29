import * as PlanActions from './plans.actions'
import {createReducer, on} from "@ngrx/store";
import {initialPlansState, PlansState} from "./plans.state";

export const plansReducer = createReducer<PlansState>(
  initialPlansState,
  on(PlanActions.setPlans, (state, {plans}) => ({...state, plans: [...plans]})),
  on(PlanActions.setUserPlans, (state, {userPlans}) => ({...state, userPlans})),
  on(PlanActions.createUserPlanSuccess, (state, {userPlan}) => ({...state, userPlans: [...state.userPlans, userPlan]})),
  on(PlanActions.fetchUserOrdersSuccess, (state, {userOrders}) => ({...state, userOrders})),
  on(PlanActions.createOrderSuccess, (state, {userOrder}) => ({...state, userOrders: [...state.userOrders, userOrder]}))
)
