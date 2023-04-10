import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-support',
  animations: [
    trigger('openClose', [
      state('open', style({
        bottom: '15%',
        opacity: 1
      })),
      state('closed', style({
        bottom: '7%',
        opacity: 0,
        zIndex: 0
      })),
      transition('open => closed', [
        animate('0.4s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  isChatShowing: boolean = false;
  isUserRegistered: boolean = false;

  toggleChat() {
    this.isChatShowing = !this.isChatShowing;
  }
}
