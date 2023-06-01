import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { scrollTo } from '../../shared/utils';
import { StorageService } from '../../shared/storage.service';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/types';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  @Input() isInDashboard: boolean = false;
  currentUser: User = {} as User;
  isLoggedIn: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    defineElement(lottie.loadAnimation);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  scrollTo(fragment: string) {
    scrollTo(fragment);
  }

  logout() {
    this.authService.logout();
  }
}
