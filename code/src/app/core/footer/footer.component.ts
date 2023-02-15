import {Component} from '@angular/core';
import {ScrollService} from "../../shared/scroll.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private scrollService: ScrollService) {
  }

  scrollTo(fragment: string) {
    this.scrollService.scrollTo(fragment);
  }
}
