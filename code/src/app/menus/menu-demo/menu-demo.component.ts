import {Component, Input} from '@angular/core';
import {MenuDetails} from "../../shared/types";

@Component({
  selector: 'app-menu-demo',
  templateUrl: './menu-demo.component.html',
  styleUrls: ['./menu-demo.component.scss']
})
export class MenuDemoComponent {
  @Input() menu: MenuDetails = {} as MenuDetails;

  toNumber(value: string): number {
    return parseInt(value);
  }

  round(value: number): number {
    return Math.round(value);
  }

}
