import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-regular',
  imports: [],
  templateUrl: './button-regular.component.html',
  styleUrl: './button-regular.component.css'
})
export class ButtonRegularComponent {
  @Input() buttonLabel : String | null = null;
  @Output() buttonOnClick = new EventEmitter<void>();

  onClick(): void {
    this.buttonOnClick.emit();
  }
  
}
