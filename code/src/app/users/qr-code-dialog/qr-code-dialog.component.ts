import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {QRCodeDialogData} from "../../shared/types";
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html'
})
export class QrCodeDialogComponent {
  qrCodeSrc!: SafeUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: QRCodeDialogData) {
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeSrc = url
  }
}
