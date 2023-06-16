import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from '../shared/auth-guard.service';
import {UsersComponent} from './users.component';
import {AccountComponent} from './account/account.component';
import {MenuEditComponent} from "./menu-edit/menu-edit.component";

const usersRoutes: Routes = [
  {
    path: 'dashboard',
    component: UsersComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'account', component: AccountComponent},
      {path: 'menus/:menuId', component: MenuEditComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
