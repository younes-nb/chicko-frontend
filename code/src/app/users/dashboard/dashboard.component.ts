import { Component, OnInit } from '@angular/core';
import { MenusService } from '../menus.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleInputDialogComponent } from 'src/app/shared/single-input-dialog/single-input-dialog.component';
import { Menu } from 'src/app/shared/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  menus: Menu[] = [];
  constructor(public menusService: MenusService, public dialog: MatDialog) {}

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
}
