import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[AutoTab]',
})
export class AutoTabDirective {

  constructor() { }

  @HostListener('keyup', ['$event']) onKeyUp(event: any) {
    const input = event.target;
    if (!input.id || event.key === 'Tab' || event.key === 'Shift') {
      return;
    }

    const length = input.value.length;
    const index = +input.name;
    const position = input.id.split(',');
    let elementByCoordinates = position;
    let elementByName = index;

    if ((length === 1 || event.key === 'ArrowRight') && input.id) {
      elementByCoordinates = position[0] + ',' + (+position[1] + 1);
      elementByName = index + 1;
    }
    if ((event.key === 'Backspace' || event.key === 'ArrowLeft') && input.id) {
      elementByCoordinates = position[0] + ',' + (+position[1] - 1);
      elementByName = index - 1;
    }
    if ((event.key === 'ArrowUp') && input.id) {
      elementByCoordinates = (+position[0] - 1) + ',' + position[1];
      elementByName = index - 1;
    }
    if ((event.key === 'ArrowDown') && input.id) {
      elementByCoordinates = (+position[0] + 1) + ',' + position[1];
      elementByName = index + 1;
    }

    const field = document.getElementById(elementByCoordinates) as HTMLInputElement;
    if (field) {
      field.focus();
      field.setSelectionRange(0, 1);
      return;
    }

    else {
      const fields = document.getElementsByName(elementByName.toString());
      if (fields && fields.item(0)) {
        const inputField = fields.item(0) as HTMLInputElement;
        inputField.focus();
        inputField.setSelectionRange(0, 1);
      }
    }
  }
}