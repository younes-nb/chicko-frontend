import {Plan, UserPlan} from "../../../shared/types";

export interface PlansState {
  plans: Plan[];
  userPlans: UserPlan[] | [];
}

export const initialPlansState: PlansState = {
  plans: [],
  userPlans: []
}
