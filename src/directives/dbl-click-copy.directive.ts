import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({ selector: '[dbl-click-copy]' })
export class DblClickCopy {

  @Output() onCopy = new EventEmitter();

  @HostBinding('attr.title')
  get title() {
    return 'Double click to copy to clipboard';
  }

  constructor(private element: ElementRef) { }

  @HostListener('dblclick', ['$event'])
  onDblClick(event) {
    const selection = getSelection();
    const range = document.createRange();

    range.selectNodeContents(this.element.nativeElement);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    this.onCopy.emit(range);
    console.log(`Copied ${range} to your clipboard!`);
  }

}
