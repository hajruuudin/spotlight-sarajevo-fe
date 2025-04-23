import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-regular',
  imports: [],
  templateUrl: './button-regular.component.html',
  styleUrl: './button-regular.component.css'
})
export class ButtonRegularComponent {
  @Input() buttonLabel : String | null = null;
  @Input() buttonOnClick: () => void = () => {};
  
}
