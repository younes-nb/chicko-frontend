import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
