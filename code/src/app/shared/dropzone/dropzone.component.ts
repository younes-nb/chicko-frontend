import {Component, OnInit, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropzoneComponent),
      multi: true
    }
  ]
})
export class DropzoneComponent implements OnInit, ControlValueAccessor {
  @Input() formControlName: string = '';

  file: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onFileAdded(event: any): void {
    this.file = event.addedFiles[0];
    this.previewImage(this.file);
    this.onChange(this.file);
    this.onTouched();
  }

  onFileRemoved(): void {
    this.file = null;
    this.previewUrl = null;
    this.onChange(this.file);
    this.onTouched();
  }

  previewImage(file: File | null): void {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
    }
  }

  writeValue(value: any): void {
    this.file = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
