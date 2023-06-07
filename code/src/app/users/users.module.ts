import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from './users.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AccountComponent } from './account/account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, AccountComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    UsersRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
