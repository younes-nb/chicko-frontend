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


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  menu$ = this.store.select(selectMenuDetails);
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
    private store: Store,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private customSnackBarService: CustomSnackBarService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const menuId = params['menuId'];
      this.store.dispatch(MenuActions.fetchMenu({menuId}));
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
        this.store.dispatch(MenuActions.deleteMenu({menuId}))
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
