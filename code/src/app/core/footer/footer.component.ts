import { Component } from '@angular/core';
import { scrollTo } from '../../shared/utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  scrollTo(fragment: string) {
    scrollTo(fragment);
  }
}
