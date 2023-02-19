import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatStepper} from "@angular/material/stepper";
import {numLatinToFa} from "../../../shared/utils";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('09[0-9]{9}')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    confirmPassword: new FormControl('', Validators.required),
    acceptTerms: new FormControl(false, Validators.requiredTrue)
  })

  verificationForm: FormGroup = new FormGroup({
    verificationCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')])
  })
  submitted = false;
  errors: Map<string, string> = new Map();

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.errors.set('username', '');
    this.errors.set('phone_number', '');
    this.errors.set('email', '');
    this.errors.set('password', '');
    this.errors.set('verificationCode', '')
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? {confirmPassword: true} : {confirmPassword: false};
  };

  onSubmit(): void {
    this.authService.register(
      this.registerForm.controls['username'].value,
      this.registerForm.controls['password'].value,
      this.registerForm.controls['phone_number'].value,
      this.registerForm.controls['email'].value
    ).subscribe({
      next: () => {
        this.openSnackBar('کد تایید برای شما ارسال شد.')
        this.stepper.next();
      },
      error: err => {
        if (err.error.username || err.error.email || err.error.phone_number) {
          for (const errorsKey in err.error) {
            this.errors.set(errorsKey, err.error[errorsKey][0]);
            this.registerForm.get(errorsKey)?.setErrors({invalid: true});
          }
        } else if (err.error.non_field_errors) {
          this.errors.set('password', err.error.non_field_errors[0]);
          this.registerForm.get('password')?.setErrors({invalid: true});
        } else if (err.status === 429) {
          this.openSnackBar('تعداد درخواست های شما از سقف مجاز عبور کرده است.');
        } else {
          this.openSnackBar('مشکلی پیش آمده است. لطفا مجددا تلاش کنید.');
        }
      }
    });
  }

  verify(): void {
    this.authService.verify(this.verificationForm.controls['verificationCode'].value).subscribe(
      {
        next: () => {
          this.openSnackBar('حساب کاربری شما با موفقیت ایجاد شد.');
          this.stepper.reset();
          this.router.navigate(['login']);
        }, error: err => {
          if (err.status === 406) {
            this.errors.set('verificationCode', 'کد وارد شده نادرست می باشد.');
            this.verificationForm.get('verificationCode')?.setErrors({invalid: true});
          } else {
            this.openSnackBar('مشکلی پیش آمده است. لطفا مجددا تلاش کنید.');
          }
        }
      });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {horizontalPosition: "end", verticalPosition: "top", duration: 8000});
  }

  numLatinToFa(num: string): string {
    return numLatinToFa(num);
  }
}
