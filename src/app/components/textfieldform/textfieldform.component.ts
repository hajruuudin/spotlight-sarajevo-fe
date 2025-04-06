import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textfieldform',
  imports: [],
  templateUrl: './textfieldform.component.html',
  styleUrl: './textfieldform.component.css'
})
export class TextfieldformComponent {
  @Input() name : string = "";
  @Input() type : string = "";
  @Input() placeholder : string = "";
}
