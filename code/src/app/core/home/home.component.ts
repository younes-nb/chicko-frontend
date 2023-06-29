import {Component} from '@angular/core';
import {scrollTo} from '../../shared/utils';
import {Store} from "@ngrx/store";
import {selectPlans} from "../store/plans/plans.selectors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  plans$ = this.store.select(selectPlans);
  constructor(private store: Store) {
  }

  scrollTo(fragment: string) {
    scrollTo(fragment);
  }
}
