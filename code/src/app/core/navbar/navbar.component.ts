import {Component} from '@angular/core';
import {ScrollService} from "../../shared/scroll.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private scrollService: ScrollService) {
  }

  scrollTo(fragment: string) {
    this.scrollService.scrollTo(fragment);
  }
}
