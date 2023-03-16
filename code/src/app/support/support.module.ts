import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupportComponent} from "./support.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";
import { RegisterChatComponent } from './register-chat/register-chat.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [SupportComponent, RegisterChatComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    FontAwesomeModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [SupportComponent]
})
export class SupportModule {
}
