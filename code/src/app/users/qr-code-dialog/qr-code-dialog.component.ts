import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MenusService} from "../menus.service";
import {QRCodeDialogData} from "../../shared/types";
import {BASE_URL} from "../../shared/api";
import {CustomSnackBarService} from "../../shared/custom-snack-bar.service";
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html'
})
export class QrCodeDialogComponent implements OnInit {
  menuLink: string = ''
  qrCodeSrc!: SafeUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: QRCodeDialogData, public menusService: MenusService, private customSnackBar: CustomSnackBarService) {
  }

  ngOnInit() {
    console.log(this.data.menuId)
    this.menusService.generateMenuLink(this.data.menuId).subscribe({
      next: (menuLink: string) => {
        this.menuLink = BASE_URL + menuLink;
      },
      error: () => {
        this.customSnackBar.openSnackBar('مشکلی پیش آمده است.');
      }
    })
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeSrc = url
  }
}
