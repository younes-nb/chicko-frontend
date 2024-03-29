import {Component, OnInit} from '@angular/core';
import * as MenuActions from "../../core/store/menus/menus.actions";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectMenuDetails} from "../../core/store/menus/menus.selectors";

@Component({
  selector: 'app-menu-preview',
  templateUrl: './menu-preview.component.html',
  styleUrls: ['./menu-preview.component.scss']
})
export class MenuPreviewComponent implements OnInit {
  menu$ = this.menusStore.select(selectMenuDetails);
  selectedCategoryIndex = 0;

  constructor(private activatedRoute: ActivatedRoute, private menusStore: Store) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const menuId = params['menuId'];
      this.menusStore.dispatch(MenuActions.fetchMenu({menuId}));
    });
  }

  toNumber(value: string): number {
    return parseInt(value);
  }

  round(value: number): number {
    return Math.round(value);
  }
}
