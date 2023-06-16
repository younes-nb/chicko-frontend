import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Clipboard} from '@angular/cdk/clipboard';
import {SingleInputDialogComponent} from 'src/app/shared/single-input-dialog/single-input-dialog.component';
import {MenusState} from 'src/app/shared/types';
import {CustomSnackBarService} from 'src/app/shared/custom-snack-bar.service';
import {QrCodeDialogComponent} from '../qr-code-dialog/qr-code-dialog.component';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectMenus} from "../../core/store/menus/menus.selectors";
import * as MenuActions from '../../core/store/menus/menus.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  menus$ = this.menusStore.select(selectMenus);

  constructor(
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private customSnackBarService: CustomSnackBarService,
    private router: Router,
    private menusStore: Store<MenusState>,
  ) {
  }

  ngOnInit(): void {
    this.menusStore.dispatch(MenuActions.fetchMenus());
  }

  editMenu(menuId: string): void {
    this.router.navigate(['/dashboard/menus', menuId]);
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
        this.menusStore.dispatch(MenuActions.createMenu({name}));
      }
    });
  }

  openQrCodeDialog(menuName: string, menuLink: string): void {
    this.dialog.open(QrCodeDialogComponent, {
      data: {
        menuName: menuName,
        menuLink: menuLink
      },
    });
  }

  copyToClipboard(menuLink: string) {
    if (menuLink) {
      this.clipboard.copy(menuLink);
      this.customSnackBarService.openSnackBar('لینک منو کپی شد.');
    }
  }
}
