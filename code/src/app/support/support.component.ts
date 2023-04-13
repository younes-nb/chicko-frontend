import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SupportService} from "./support.service";
import {SupportChatComponent} from "../shared/types";

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

  constructor(private supportService: SupportService) {
  }

  toggleChat(): void {
    this.isChatShowing = !this.isChatShowing;
  }

  getComponent(): SupportChatComponent {
    return this.supportService.component;
  }
}
