import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './core/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TypingAnimatorModule } from 'angular-typing-animator';
import { MatCardModule } from '@angular/material/card';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { FooterComponent } from './core/footer/footer.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './core/auth/login/login.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsersModule } from './users/users.module';
import { SupportModule } from './support/support.module';
import { MatDialogModule } from '@angular/material/dialog';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    TypingAnimatorModule,
    MatCardModule,
    LoadingBarHttpClientModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    FormsModule,
    MatSidenavModule,
    UsersModule,
    SupportModule,
    MatDialogModule,
    NavbarComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
