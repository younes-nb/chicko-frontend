import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
