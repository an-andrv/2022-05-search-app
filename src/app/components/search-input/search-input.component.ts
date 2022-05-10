import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() text: string = '';
  @Input() label = 'Введите имя репозитория';
  @Input() placeholder = 'Имя репозитория';
  @Output() changeText = new EventEmitter<string>();

  constructor() {}

  onChange(text: string = ''): void {
    if (typeof text === 'string') {
      this.changeText.next(text || '');
    }
  }
}
