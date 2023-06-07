import { Component, OnInit } from '@angular/core';
import { MenusService } from '../menus.service';
import { Menu } from 'src/app/shared/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  menus: Menu[] = [];
  constructor(private menusService: MenusService) {}

  ngOnInit(): void {
    this.menus = this.menusService.menus;
  }
}
