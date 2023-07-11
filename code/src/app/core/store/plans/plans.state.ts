import {Order, Plan, UserPlan} from "../../../shared/types";

export interface PlansState {
  plans: Plan[];
  userPlans: UserPlan[];
  userOrders: Order[];
}

export const initialPlansState: PlansState = {
  plans: [],
  userPlans: [],
  userOrders: []
}
