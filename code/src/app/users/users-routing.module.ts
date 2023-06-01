import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { UsersComponent } from './users.component';

const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuardService],
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
