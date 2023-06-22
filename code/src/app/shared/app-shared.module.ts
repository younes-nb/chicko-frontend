import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NumLatinToFaPipe} from './num-latin-to-fa.pipe';
import {SingleInputDialogComponent} from './single-input-dialog/single-input-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@NgModule({
  declarations: [NumLatinToFaPipe, SingleInputDialogComponent, DeleteDialogComponent, ImageDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        NgOptimizedImage
    ],
  exports: [NumLatinToFaPipe, SingleInputDialogComponent],
})
export class AppSharedModule {
}
