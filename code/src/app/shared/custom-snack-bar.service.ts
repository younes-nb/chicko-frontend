import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'بستن', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 8000,
    });
  }
}
