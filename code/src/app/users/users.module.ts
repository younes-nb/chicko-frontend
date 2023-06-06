import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from './users.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, AccountComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    NavbarComponent,
    UsersRoutingModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
