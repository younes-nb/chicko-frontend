import {Component} from '@angular/core';
import {scrollTo} from '../../shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  scrollTo(fragment: string) {
    scrollTo(fragment);
  }
}
