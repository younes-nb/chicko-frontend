import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appScroller]',
})
export class ScrollerDirective implements AfterViewInit {
  private observer: MutationObserver | undefined;

  constructor(private elRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        if (mutation.target.parentElement) {
          mutation.target.parentElement.scrollTo({
            top: mutation.target.parentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
    });
    let config = {attributes: true, childList: true, characterData: true};
    this.observer.observe(this.elRef.nativeElement, config);
  }
}
