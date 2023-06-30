import {Component, Input} from '@angular/core';
import {MenuDetails} from "../../shared/types";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as MenuActions from "../../core/store/menus/menus.actions";

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent {
  @Input() menu: MenuDetails = {} as MenuDetails;
  submitted: boolean = false;
  menuForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    telephone: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  });

  constructor(private menusStore: Store) {
  }

  onSubmit(): void {
    this.menusStore.dispatch(MenuActions.updateMenu({
      id: this.menu.id,
      name: this.menuForm.controls['name'].value,
      telephone: this.menuForm.controls['telephone'].value,
      phone: this.menuForm.controls['phone'].value,
      address: this.menuForm.controls['address'].value
    }))
  }
}
