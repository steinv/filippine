import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[AutoTab]'
})
export class AutoTabDirective {

  constructor() {}

  @HostListener('keyup', ['$event']) onKeyUp(event: any) {
    const input = event.target;
    if(!input.id || event.key === 'Tab' || event.key === 'Shift'){
      return;
    }

    const length = input.value.length;
    const position = input.id.split(',');
    let element;

    if ((length === 1 || event.key === 'ArrowRight') && input.id) {
      element = position[0] + ',' + (+position[1] + 1);
    }
    if((event.key === 'Backspace' || event.key === 'ArrowLeft') && input.id) {
      element = position[0] + ',' + (+position[1] - 1);
    }
    if((event.key === 'ArrowUp') && input.id) {
      element = (+position[0] - 1) + ',' + position[1];
    }
    if((event.key === 'ArrowDown') && input.id) {
      element = (+position[0] + 1) + ',' + position[1];
    }

    if(!element){
      return;
    }

    const field = document.getElementById(element) as HTMLInputElement;
    if (field) {
      field.focus();
      field.setSelectionRange(0,1);
    }    
  }
}