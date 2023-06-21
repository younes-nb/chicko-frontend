import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {selectMenuDetails} from "../../core/store/menus/menus.selectors";
import {Store} from "@ngrx/store";
import * as MenuActions from "../../core/store/menus/menus.actions";
import {QrCodeDialogComponent} from "../qr-code-dialog/qr-code-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Clipboard} from "@angular/cdk/clipboard";
import {CustomSnackBarService} from "../../shared/custom-snack-bar.service";
import {DeleteMenuDialogComponent} from "../delete-menu-dialog/delete-menu-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SingleInputDialogComponent} from "../../shared/single-input-dialog/single-input-dialog.component";


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  menu$ = this.menusStore.select(selectMenuDetails);
  submitted: boolean = false;
  menuItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.pattern("[0-9]+")),
    discount: new FormControl('', Validators.pattern("([0-9]+[.])?[0-9]+")),
    description: new FormControl(''),
    image: new FormControl(''),
    is_available: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private menusStore: Store,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private customSnackBarService: CustomSnackBarService
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
        menuLink: menuLink
      },
    });
  }

  onSubmit() {

  }


  openDeleteMenuDialog(menuId: string): void {
    const dialogRef = this.dialog.open(DeleteMenuDialogComponent);
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

  copyToClipboard(menuLink: string) {
    if (menuLink) {
      this.clipboard.copy(menuLink);
      this.customSnackBarService.openSnackBar('لینک منو کپی شد.');
    }
  }
}
