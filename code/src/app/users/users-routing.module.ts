import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { UsersComponent } from './users.component';
import { AccountComponent } from './account/account.component';

const usersRoutes: Routes = [
  {
    path: 'dashboard',
    component: UsersComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
