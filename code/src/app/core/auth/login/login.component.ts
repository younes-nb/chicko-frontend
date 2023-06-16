import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/auth.service';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {login} from "../../store/auth/auth.actions";
import {AuthState} from "../../../shared/types";
import {selectAuthError, selectIsAuthenticated} from "../../store/auth/auth.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  error$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authStore: Store<AuthState>
  ) {
    this.error$ = this.authStore.select(selectAuthError);
    this.isAuthenticated$ = this.authStore.select(selectIsAuthenticated);
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  onSubmit(): void {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    this.authStore.dispatch(login({username, password}));
  }
}
