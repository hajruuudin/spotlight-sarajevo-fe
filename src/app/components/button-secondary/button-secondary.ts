import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  imports: [NgClass],
  templateUrl: './button-secondary.html',
  styleUrl: './button-secondary.css',
})
export class ButtonSecondary {
  @Input() public buttonContent: String = '';
  @Input() public classAddons: String = '';
  @Input() public buttonIcon: String = 'DEFAULT';

  @Output() pressed: EventEmitter<void> = new EventEmitter<void>();
  handleClick() {
    this.pressed.emit();
  }
}
