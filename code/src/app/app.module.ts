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
  faShareNodes,
  faQrcode,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TypingAnimatorModule} from "angular-typing-animator";
import {MatCardModule} from "@angular/material/card";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent
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
      faShareNodes,
      faQrcode,
      faHome
    )
  }
}
