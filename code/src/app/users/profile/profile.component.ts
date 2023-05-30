import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { User } from '../../shared/types';
import { StorageService } from '../../shared/storage.service';
import { AuthService } from '../../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenusComponent } from '../menus/menus.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductsComponent } from '../products/products.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  vcr!: ViewContainerRef;
  ref!: ComponentRef<any>;
  currentUser: User = {} as User;
  isInit: boolean = true;
  profileTitle: string = 'منو ها';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUserToken();
  }

  changeChild(componentName: string) {
    if (!this.isInit) {
      const index = this.vcr.indexOf(this.ref.hostView);
      if (index != -1) this.vcr.remove(index);
    }
    this.isInit = false;
    switch (componentName) {
      case 'menus':
        this.profileTitle = 'منو ها';
        this.ref = this.vcr.createComponent(MenusComponent);
        break;
      case 'categories':
        this.profileTitle = 'دسته بندی ها';
        this.ref = this.vcr.createComponent(CategoriesComponent);
        break;
      case 'products':
        this.profileTitle = 'کالا ها';
        this.ref = this.vcr.createComponent(ProductsComponent);
        break;
      case 'userInfo':
        this.profileTitle = 'اطلاعات کاربری';
        this.ref = this.vcr.createComponent(UserInfoComponent);
        break;
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean();
        window.location.reload();
      },
      error: () => {
        this.openSnackBar('مشکلی پیش آمده است.');
      },
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 8000,
    });
  }
}
