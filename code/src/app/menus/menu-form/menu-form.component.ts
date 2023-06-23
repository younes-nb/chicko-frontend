import {Component, Input} from '@angular/core';
import {MenuDetails, Theme} from "../../shared/types";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectThemes} from "../../core/store/menus/menus.selectors";
import * as MenuActions from "../../core/store/menus/menus.actions";

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent {
  @Input() menu: MenuDetails = {} as MenuDetails;
  themes$: Observable<Theme[]> = this.menusStore.select(selectThemes);
  submitted: boolean = false;
  menuForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    telephone: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    theme: new FormControl('')
  });

  constructor(private menusStore: Store) {
  }

  onSubmit(): void {
    console.log(this.menu)
    console.log(this.menuForm.controls['theme'].value)
    this.menusStore.dispatch(MenuActions.updateMenu({
      id: this.menu.id,
      name: this.menuForm.controls['name'].value,
      theme: this.menuForm.controls['theme'].value,
      telephone: this.menuForm.controls['telephone'].value,
      phone: this.menuForm.controls['phone'].value,
      address: this.menuForm.controls['address'].value
    }))
  }
}
