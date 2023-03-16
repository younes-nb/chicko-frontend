import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './core/home/home.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {MatButtonModule} from "@angular/material/button";
import {NavbarComponent} from './core/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  faUserCircle,
  faShoppingCart,
  faFolder,
  faHeadset,
  faQrcode,
  faHome,
  faCreditCard,
  faArrowRightFromBracket,
  faBars,
  faGaugeSimpleHigh,
  faBoxOpen,
  faMessage
} from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faInstagram, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons"
import {MatTooltipModule} from "@angular/material/tooltip";
import {TypingAnimatorModule} from "angular-typing-animator";
import {MatCardModule} from "@angular/material/card";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {FooterComponent} from './core/footer/footer.component';
import {RegisterComponent} from './core/auth/register/register.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoginComponent} from './core/auth/login/login.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UsersModule} from "./users/users.module";
import {SupportModule} from "./support/support.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
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
    FontAwesomeModule,
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
    SupportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faUserCircle,
      faShoppingCart,
      faFolder,
      faHeadset,
      faQrcode,
      faHome,
      faCreditCard,
      faTelegram,
      faInstagram,
      faLinkedin,
      faGithub,
      faArrowRightFromBracket,
      faBars,
      faGaugeSimpleHigh,
      faBoxOpen,
      faMessage
    )
  }
}
