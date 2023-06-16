import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {selectMenuDetails} from "../../core/store/menus/menus.selectors";
import {Store} from "@ngrx/store";
import {MenusState} from "../../shared/types";
import * as MenuActions from "../../core/store/menus/menus.actions";


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  menu$ = this.store.select(selectMenuDetails);
  constructor(private route: ActivatedRoute, private store: Store<MenusState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const menuId = params['menuId'];
      this.store.dispatch(MenuActions.fetchMenu(menuId));
    });
  }
}
