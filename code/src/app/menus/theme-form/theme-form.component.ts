import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {MenuItemFormMethod, Theme} from "../../shared/types";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import * as MenuActions from "../../core/store/menus/menus.actions";

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent {
  @Input() theme: Theme = {} as Theme;
  @Input() formMethod: MenuItemFormMethod = 'post';
  submitted: boolean = false;
  themeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    font_family: new FormControl(''),
    menu_background_color: new FormControl(''),
    menu_text_color: new FormControl(''),
    header_color: new FormControl(''),
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
      name: this.themeForm.controls['name'].value,
      font_family: this.themeForm.controls['font_family'].value,
      menu_background_color: this.themeForm.controls['menu_background_color'].value,
      menu_text_color: this.themeForm.controls['menu_text_color'].value,
      header_color: this.themeForm.controls['header_color'].value,
      logo_image: this.themeForm.controls['logo_image'].value,
    }
    if (this.formMethod === "post") {
      this.menusStore.dispatch(MenuActions.createTheme(props));

    } else if (this.formMethod === "put") {

    }
  }

  openShowLogoImageDialog(logoImage: string): void {

  }

  openDeleteThemeDialog(themeId: string, themeName: string): void {

  }
}
