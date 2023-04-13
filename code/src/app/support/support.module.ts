import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupportComponent} from "./support.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";
import {RegisterChatComponent} from './register-chat/register-chat.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {RoomDialog, RoomsComponent} from "./rooms/rooms.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatRippleModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {ChatComponent} from './chat/chat.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {GetUserNamePipe} from './chat/get-user-name.pipe';


@NgModule({
  declarations: [SupportComponent, RegisterChatComponent, RoomsComponent, RoomDialog, ChatComponent, GetUserNamePipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    FontAwesomeModule,
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
    ClipboardModule
  ],
  exports: [SupportComponent]
})
export class SupportModule {
}
