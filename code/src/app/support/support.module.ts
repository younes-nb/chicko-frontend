import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupportComponent} from "./support.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [SupportComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    FontAwesomeModule,
    MatIconModule
  ],
  exports: [SupportComponent]
})
export class SupportModule {
}
