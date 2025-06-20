import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  imports: [NgClass],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.css'
})
export class ButtonPrimaryComponent {
  @Input() buttonLabel: string = ''
  @Input() buttonType: string = ''
  @Output() buttonOnClick = new EventEmitter<void>();

  onClick(): void {
    this.buttonOnClick.emit();
  }
}
