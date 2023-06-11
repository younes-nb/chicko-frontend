import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenusService} from '../menus.service';
import {MatDialog} from '@angular/material/dialog';
import {Clipboard} from '@angular/cdk/clipboard';
import {SingleInputDialogComponent} from 'src/app/shared/single-input-dialog/single-input-dialog.component';
import {Menu} from 'src/app/shared/types';
import {BASE_URL} from 'src/app/shared/api';
import {CustomSnackBarService} from 'src/app/shared/custom-snack-bar.service';
import {QrCodeDialogComponent} from '../qr-code-dialog/qr-code-dialog.component';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  private currentUserSubscription: Subscription = Subscription.EMPTY;

  constructor(
    public menusService: MenusService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private customSnackBarService: CustomSnackBarService,
  ) {
  }

  ngOnInit(): void {
    this.menusService.getMenus().subscribe((menus: Menu[]) => {
      this.menus = menus;
      this.menus.forEach((menu: Menu) => {
        this.menusService.generateMenuLink(menu.id).subscribe((link: string) => {
          menu.link = BASE_URL + link;
        });
      });

    });
    this.menusService.fetchMenus();
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
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

  openQrCodeDialog(menuId: string, menuName: string): void {
    this.dialog.open(QrCodeDialogComponent, {
      data: {
        menuId: menuId,
        menuName: menuName
      },
    });
  }

  copyMenuLink(menuId: string) {
    this.menusService.generateMenuLink(menuId).subscribe({
      next: (menuLink: string) => {
        this.copyToClipboard(BASE_URL + menuLink);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  copyToClipboard(menuLink: string) {
    this.clipboard.copy(menuLink);
    this.customSnackBarService.openSnackBar('لینک منو کپی شد.');
  }
}
