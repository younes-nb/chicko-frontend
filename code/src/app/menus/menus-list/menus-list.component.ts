import {Component, OnInit} from '@angular/core';
import {selectMenus} from "../../core/store/menus/menus.selectors";
import {MatDialog} from "@angular/material/dialog";
import {Clipboard} from "@angular/cdk/clipboard";
import {CustomSnackBarService} from "../../shared/custom-snack-bar.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as MenuActions from "../../core/store/menus/menus.actions";
import {Menu} from "../../shared/types";
import {SingleInputDialogComponent} from "../../shared/single-input-dialog/single-input-dialog.component";
import {QrCodeDialogComponent} from "../qr-code-dialog/qr-code-dialog.component";
import {Observable} from "rxjs";
import {BASE_URL} from "../../shared/url";

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.scss']
})
export class MenusListComponent implements OnInit {
  menus$: Observable<Menu[]> = this.menusStore.select(selectMenus);

  constructor(
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private customSnackBarService: CustomSnackBarService,
    private router: Router,
    private menusStore: Store,
  ) {
  }

  ngOnInit(): void {
    this.menusStore.dispatch(MenuActions.fetchMenus());
  }

  hasMenu(menus: Menu[]): boolean {
    return <boolean>(menus.length && menus[0].id !== '');
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
        menuLink: BASE_URL + menuLink
      },
    });
  }

  copyToClipboard(menuLink: string) {
    if (menuLink) {
      this.clipboard.copy(BASE_URL + menuLink);
      this.customSnackBarService.openSnackBar('لینک منو کپی شد.');
    }
  }
}
