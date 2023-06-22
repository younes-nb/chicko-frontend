import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ImageDialogData} from "../types";

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html'
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageDialogData) {
  }
}
