import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {UsersService} from './users.service';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {AccountComponent} from './account/account.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [UsersComponent, AccountComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    NgOptimizedImage,
    UsersRoutingModule,
  ],
  providers: [UsersService],
})
export class UsersModule {
}
