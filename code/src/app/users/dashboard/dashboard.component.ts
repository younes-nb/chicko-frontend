import { Component, OnInit } from '@angular/core';
import { MenusService } from '../menus.service';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { SingleInputDialogComponent } from 'src/app/shared/single-input-dialog/single-input-dialog.component';
import { Menu } from 'src/app/shared/types';
import { BASE_URL } from 'src/app/shared/api';
import { CustomeSnackBarService } from 'src/app/shared/custome-snack-bar.service';
import { QrCodeDialogComponent } from '../qr-code-dialog/qr-code-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  menus: Menu[] = [];
  constructor(
    public menusService: MenusService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private customeSnackBarService: CustomeSnackBarService
  ) {}

  ngOnInit(): void {
    this.menusService.getMenus().subscribe((menus: Menu[]) => {
      this.menus = menus;
    });
    this.menusService.fetchMenus();
  }

  openCreateMenuDialog(): void {
    const dialogRef = this.dialog.open(SingleInputDialogComponent, {
      data: {
        title: 'افزودن منوی جدید',
        label: 'عنوان منو',
      },
    });
    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this.menusService.createMenu(name);
      }
    });
  }

  openQrCodeDialog(menuId: string): void {
    this.dialog.open(QrCodeDialogComponent, {
      data: {
        menuId: menuId,
      },
    });
  }

  copyToClipboard(menuLink: string) {
    this.clipboard.copy(BASE_URL + menuLink);
    this.customeSnackBarService.openSnackBar('لینک منو کپی شد.');
  }
}
