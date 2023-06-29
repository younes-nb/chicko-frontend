import {Plan, UserPlan} from "../../../shared/types";

export interface PlansState {
  plans: Plan[];
  userPlan: UserPlan | null;
}

export const initialPlansState: PlansState = {
  plans: [],
  userPlan: null
}
