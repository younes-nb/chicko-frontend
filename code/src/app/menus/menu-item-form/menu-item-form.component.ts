import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MenuItem, MenuItemFormMethod} from "../../shared/types";
import {Store} from "@ngrx/store";
import * as MenuActions from "../../core/store/menus/menus.actions";
import {MatDialog} from "@angular/material/dialog";
import {ImageDialogComponent} from "../../shared/image-dialog/image-dialog.component";
import {DeleteDialogComponent} from "../../shared/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.scss']
})
export class MenuItemFormComponent {
  @Input() data: MenuItem = {} as MenuItem;
  @Input() formMethod: MenuItemFormMethod = 'post';
  submitted: boolean = false;
  menuItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(''),
    discount: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    is_available: new FormControl('')
  });

  constructor(private menusStore: Store, public dialog: MatDialog,) {
  }

  onSubmit(): void {
    const props = {
      name: this.menuItemForm.controls['name'].value,
      menu: this.data.menu,
      category: this.data.category,
      image: this.menuItemForm.controls['image'].value[0],
      is_available: this.menuItemForm.controls['is_available'].value,
      description: this.menuItemForm.controls['description'].value,
      price: this.menuItemForm.controls['price'].value,
      discount: this.menuItemForm.controls['discount'].value
    }
    if (this.formMethod === "post") {
      this.menusStore.dispatch(MenuActions.createMenuItem(props));
    } else if (this.formMethod === "put") {
      this.menusStore.dispatch(MenuActions.updateMenuItem({id: this.data.id, ...props}));
    }
  }

  openShowMenuItemImageDialog(image: string): void {
    this.dialog.open(ImageDialogComponent, {data: {image}});
  }

  openDeleteMenuItemDialog(menuItemId: string, menuItemName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: menuItemName,
        isMenu: false
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.menusStore.dispatch(MenuActions.deleteMenuItem({id: menuItemId}))
      }
    })
  }
}
