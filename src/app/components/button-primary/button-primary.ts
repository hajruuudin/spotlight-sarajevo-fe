import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  imports: [NgClass],
  templateUrl: './button-primary.html',
  styleUrl: './button-primary.css'
})
export class ButtonPrimary {
  @Input() public buttonContent: String = ''
  @Input() public classAddons: String = ''
  @Input() public buttonIcon: String = 'DEFAULT'

  @Output() pressed: EventEmitter<void> = new EventEmitter<void>
  handleClick() {
    this.pressed.emit();
  }
}
