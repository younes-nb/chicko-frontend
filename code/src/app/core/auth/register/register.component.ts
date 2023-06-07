import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { numLatinToFa } from '../../../shared/utils';
import { CustomeSnackBarService } from 'src/app/shared/custome-snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  submitted = false;
  errors: Map<string, string> = new Map();
  hidePassword: boolean = true;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('09[0-9]{9}'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128),
    ]),
  });

  verificationForm: FormGroup = new FormGroup({
    verificationCode: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{6}'),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private customeSnackBarService: CustomeSnackBarService
  ) {
    this.errors.set('username', '');
    this.errors.set('phone_number', '');
    this.errors.set('email', '');
    this.errors.set('password', '');
    this.errors.set('verificationCode', '');
  }

  onSubmit(): void {
    this.authService
      .register(
        this.registerForm.controls['username'].value,
        this.registerForm.controls['password'].value,
        this.registerForm.controls['phone_number'].value,
        this.registerForm.controls['email'].value
      )
      .subscribe({
        next: () => {
          this.customeSnackBarService.openSnackBar(
            'حساب کاربری شما با موفقیت ایجاد شد.'
          );
          this.stepper.next();
        },
        error: (err: any) => {
          if (err.error.username || err.error.email || err.error.phone_number) {
            for (const errorsKey in err.error) {
              this.errors.set(errorsKey, err.error[errorsKey][0]);
              this.registerForm.get(errorsKey)?.setErrors({ invalid: true });
            }
          } else if (err.error.non_field_errors) {
            this.errors.set('password', err.error.non_field_errors[0]);
            this.registerForm.get('password')?.setErrors({ invalid: true });
          } else if (err.status === 429) {
            this.customeSnackBarService.openSnackBar(
              'تعداد درخواست های شما از سقف مجاز عبور کرده است.'
            );
          } else {
            this.customeSnackBarService.openSnackBar(
              'مشکلی پیش آمده است. لطفا مجددا تلاش کنید.'
            );
          }
        },
      });
  }

  verify(): void {
    this.authService
      .verify(this.verificationForm.controls['verificationCode'].value)
      .subscribe({
        next: () => {
          this.stepper.reset();
          this.router.navigate(['login']);
          this.customeSnackBarService.openSnackBar(
            'حساب کاربری شما با موفقیت فعال شد.'
          );
        },
        error: (err: any) => {
          if (err.status === 406) {
            this.errors.set('verificationCode', 'کد وارد شده نادرست می باشد.');
            this.verificationForm
              .get('verificationCode')
              ?.setErrors({ invalid: true });
          } else {
            this.customeSnackBarService.openSnackBar(
              'مشکلی پیش آمده است. لطفا مجددا تلاش کنید.'
            );
          }
        },
      });
  }

  numLatinToFa(num: string): string {
    return numLatinToFa(num);
  }
}
