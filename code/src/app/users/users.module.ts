import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MatChipsModule } from '@angular/material/chips';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { AppPipModule } from '../shared/app-pip.module';

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
    MatChipsModule,
    AppPipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UsersService],
})
export class UsersModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
