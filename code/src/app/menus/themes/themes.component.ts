import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Theme} from "../../shared/types";
import {selectThemes} from "../../core/store/menus/menus.selectors";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent {
  themes$: Observable<Theme[]> = this.menusStore.select(selectThemes);

  constructor(private menusStore: Store) {
  }

}
