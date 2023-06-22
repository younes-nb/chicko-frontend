import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SingleInputDialogData} from '../types';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-single-input-dialog',
  templateUrl: './single-input-dialog.component.html',
})
export class SingleInputDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SingleInputDialogData) {
  }

  formGroup: FormGroup = new FormGroup({
    input: new FormControl('', Validators.required),
  });
}
