import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MenuComponent} from "./menu/menu.component";
import {MenusListComponent} from './menus-list/menus-list.component';
import {QrCodeDialogComponent} from "./qr-code-dialog/qr-code-dialog.component";
import {MenusService} from "./menus.service";
import {AppSharedModule} from "../shared/app-shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {QRCodeModule} from "angularx-qrcode";
import {MenuItemFormComponent} from './menu-item-form/menu-item-form.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MenuFormComponent} from './menu-form/menu-form.component';
import {MatSelectModule} from "@angular/material/select";
import {ThemesComponent} from './themes/themes.component';
import {ThemeFormComponent} from './theme-form/theme-form.component';


@NgModule({
  declarations: [MenuComponent, MenusListComponent, QrCodeDialogComponent, MenuItemFormComponent, MenuFormComponent, ThemesComponent, ThemeFormComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    RouterLink,
    MatTooltipModule,
    NgOptimizedImage,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    QRCodeModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [MenusService]
})
export class MenusModule {
}
