import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SupportService} from "../support.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register-chat',
  templateUrl: './register-chat.component.html'
})
export class RegisterChatComponent {
  registerChatForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  })
  submitted: boolean = false;

  constructor(private supportService: SupportService, private snackBar: MatSnackBar) {
  }

  onSubmit(): void {
    this.supportService.register(this.registerChatForm.controls['email'].value, this.registerChatForm.controls['name'].value).subscribe({
      next: data => {
        this.supportService.user = data.data;
        this.supportService.component = 'rooms';
      },
      error: () => {
        this.openSnackBar('مشکلی پیش آمده است.');
      }
    })
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {horizontalPosition: "end", verticalPosition: "top", duration: 8000});
  }
}
