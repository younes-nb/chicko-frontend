import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SupportComponent} from './support.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {RegisterChatComponent} from './register-chat/register-chat.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {RoomsComponent} from './rooms/rooms.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {ChatComponent} from './chat/chat.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {GetUserNamePipe} from './chat/get-user-name.pipe';
import {AutosizeModule} from 'ngx-autosize';
import {ScrollerDirective} from './chat/scroller.directive';
import {defineElement} from 'lord-icon-element';
import lottie from 'lottie-web';
import {AppSharedModule} from '../shared/app-shared.module';
import {PickerComponent} from "@ctrl/ngx-emoji-mart";

@NgModule({
  declarations: [
    SupportComponent,
    RegisterChatComponent,
    RoomsComponent,
    ChatComponent,
    GetUserNamePipe,
    ScrollerDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatDialogModule,
    MatRippleModule,
    MatTableModule,
    MatMenuModule,
    CdkDropList,
    CdkDrag,
    ClipboardModule,
    FormsModule,
    AutosizeModule,
    AppSharedModule,
    NgOptimizedImage,
    PickerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SupportComponent],
})
export class SupportModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
