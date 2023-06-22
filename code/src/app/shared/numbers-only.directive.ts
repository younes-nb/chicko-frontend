import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  @Output() valueChange = new EventEmitter();

  constructor(private _el: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this._el.nativeElement.value;
    const newValue = initialValue.replace(/[^0-9]*/g, '');
    this._el.nativeElement.value = newValue;
    this.valueChange.emit(newValue);
    if (initialValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
