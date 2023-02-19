import {Component} from '@angular/core';
import {scrollTo} from "../../shared/utils";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  scrollTo(fragment: string) {
    scrollTo(fragment);
  }
}
