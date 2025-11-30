import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  imports: [NgClass],
  templateUrl: './button-primary.html',
  styleUrl: './button-primary.css',
  host: {
    class: 'w-full'
  }
})
export class ButtonPrimary {
  @Input() public buttonContent: String = '';
  @Input() public classAddons: String = '';
  @Input() public buttonType: String = 'DEFAULT';

  @Output() pressed: EventEmitter<void> = new EventEmitter<void>();
  handleClick() {
    this.pressed.emit();
  }
  getBaseClasses(): string {
  return `
    h-12 rounded-2xl
    transition-all font-semibold text-xl
  `;
}

getBgClass(): string {
  switch (this.buttonType) {
    case 'DANGER':
      return 'dark:bg-(--accent-400) bg-(--accent-700) dark:hover:bg-(--accent-700) hover:bg-(--accent-800)';
    case 'INFO':
      return 'dark:bg-yellow-600 bg-yellow-300 dark:hover:bg-(--accent-700) hover:bg-(--accent-800)';
    default:
      return 'dark:bg-(--secondary-400) bg-(--secondary-700) dark:hover:bg-(--accent-700) hover:bg-(--accent-800)';
  }
}
}
