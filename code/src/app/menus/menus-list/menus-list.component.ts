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
import {selectUserPlans} from "../../core/store/plans/plans.selectors";
import {PlansService} from "../../users/plans.service";

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.scss']
})
export class MenusListComponent implements OnInit {
  menus$: Observable<Menu[]> = this.store.select(selectMenus);
  userPlans$ = this.store.select(selectUserPlans);

  constructor(
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private customSnackBarService: CustomSnackBarService,
    private router: Router,
    private store: Store,
    public plansService: PlansService,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(MenuActions.fetchMenus());
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
        this.store.dispatch(MenuActions.createMenu({name}));
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
