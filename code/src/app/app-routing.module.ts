import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {RegisterComponent} from './core/auth/register/register.component';
import {LoginComponent} from './core/auth/login/login.component';
import {UsersRoutingModule} from './users/users-routing.module';
import {MenuPreviewComponent} from "./menus/menu-preview/menu-preview.component";

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menus/:menuId', component: MenuPreviewComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100],
    }),
    UsersRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
