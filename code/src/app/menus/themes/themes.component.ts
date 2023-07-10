import {Component, Input} from '@angular/core';
import {MenuDetails} from "../../shared/types";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as MenuActions from "../../core/store/menus/menus.actions";
import {ImageDialogComponent} from "../../shared/image-dialog/image-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent {
  @Input() menu: MenuDetails = {} as MenuDetails;
  submitted: boolean = false;
  themeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    font_family: new FormControl(''),
    menu_background_color: new FormControl(''),
    menu_text_color: new FormControl(''),
    header_color: new FormControl(''),
    menu_item_background_color: new FormControl(''),
    logo_image: new FormControl('')
  });
  fontFamilies: string[] = [
    'Arial',
    'Vazir',
    'Khandevane',
  ];


  constructor(private menusStore: Store, private dialog: MatDialog) {
  }

  onSubmit(): void {
    const props = {
      id: this.menu.theme.id,
      name: this.themeForm.controls['name'].value,
      font_family: this.themeForm.controls['font_family'].value,
      menu_background_color: this.themeForm.controls['menu_background_color'].value,
      menu_text_color: this.themeForm.controls['menu_text_color'].value,
      header_color: this.themeForm.controls['header_color'].value,
      menu_item_background_color: this.themeForm.controls['menu_item_background_color'].value,
      logo_image: this.themeForm.controls['logo_image'].value,
    }
    this.menusStore.dispatch(MenuActions.updateTheme(props))
  }

  openShowLogoImageDialog(image: string): void {
    this.dialog.open(ImageDialogComponent, {data: {image}});
  }

}
