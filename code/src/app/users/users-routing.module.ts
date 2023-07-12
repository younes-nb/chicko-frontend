import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../shared/auth-guard.service';
import {UsersComponent} from './users.component';
import {AccountComponent} from './account/account.component';
import {MenuComponent} from "../menus/menu/menu.component";
import {MenusListComponent} from "../menus/menus-list/menus-list.component";
import {UserPlansComponent} from "./user-plans/user-plans.component";

const usersRoutes: Routes = [
  {
    path: 'dashboard',
    component: UsersComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', component: MenusListComponent},
      {path: 'account', component: AccountComponent},
      {path: 'user-plans', component: UserPlansComponent},
      {path: 'menus/:menuId', component: MenuComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
