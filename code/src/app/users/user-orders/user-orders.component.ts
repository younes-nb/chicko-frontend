import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectUserOrders} from "../../core/store/plans/plans.selectors";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {
  userOrders$ = this.store.select(selectUserOrders);
  displayedColumns: string[] = ['type', 'payable_amount', 'is_paid']

  constructor(private store: Store) {
  }

}
