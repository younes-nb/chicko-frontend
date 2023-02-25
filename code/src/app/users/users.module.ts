import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MenusComponent} from './menus/menus.component';
import {CategoriesComponent} from './categories/categories.component';
import {ProductsComponent} from './products/products.component';
import {UserInfoComponent} from './user-info/user-info.component';


@NgModule({
  declarations: [DashboardComponent, ProfileComponent, MenusComponent, CategoriesComponent, ProductsComponent, UserInfoComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class UsersModule {
}
