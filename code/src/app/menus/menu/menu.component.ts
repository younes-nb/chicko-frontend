import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {selectMenuDetails} from "../../core/store/menus/menus.selectors";
import {Store} from "@ngrx/store";
import * as MenuActions from "../../core/store/menus/menus.actions";
import {QrCodeDialogComponent} from "../qr-code-dialog/qr-code-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Clipboard} from "@angular/cdk/clipboard";
import {CustomSnackBarService} from "../../shared/custom-snack-bar.service";
import {SingleInputDialogComponent} from "../../shared/single-input-dialog/single-input-dialog.component";
import {DeleteDialogComponent} from "../../shared/delete-dialog/delete-dialog.component";
import {BASE_URL} from "../../shared/url";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu$ = this.menusStore.select(selectMenuDetails);


  constructor(
    private route: ActivatedRoute,
    private menusStore: Store,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private customSnackBarService: CustomSnackBarService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const menuId = params['menuId'];
      this.menusStore.dispatch(MenuActions.fetchMenu({menuId}));
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

  openDeleteMenuDialog(menuId: string, menuName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: menuName,
        isMenu: true
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.menusStore.dispatch(MenuActions.deleteMenu({menuId}))
      }
    })
  }

  openCreateCategoryDialog(menuId: string): void {
    const dialogRef = this.dialog.open(SingleInputDialogComponent, {
      data: {
        title: 'افزودن دسته بندی جدید',
        label: 'عنوان دسته بندی'
      }
    });
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.menusStore.dispatch(MenuActions.createCategory({name, menu: menuId}));
      }
    });
  }

  openUpdateCategoryDialog(menuId: string, categoryId: string, categoryName: string): void {
    const dialogRef = this.dialog.open(SingleInputDialogComponent, {
      data: {
        title: 'ویرایش دسته بندی',
        label: 'عنوان دسته بندی',
        value: categoryName
      }
    });
    dialogRef.afterClosed().subscribe(name => {
      if (name && name !== categoryName) {
        this.menusStore.dispatch(MenuActions.updateCategory({id: categoryId, name, menu: menuId}));
      }
    })
  }

  openDeleteCategoryDialog(categoryId: string, categoryName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: categoryName,
        isMenu: false
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.menusStore.dispatch(MenuActions.deleteCategory({id: categoryId}))
      }
    })
  }

  copyToClipboard(menuLink: string) {
    if (menuLink) {
      this.clipboard.copy(BASE_URL + menuLink);
      this.customSnackBarService.openSnackBar('لینک منو کپی شد.');
    }
  }
}
