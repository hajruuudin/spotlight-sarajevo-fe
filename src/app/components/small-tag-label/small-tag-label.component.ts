import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-tag-label',
  imports: [],
  templateUrl: './small-tag-label.component.html',
  styleUrl: './small-tag-label.component.css'
})
export class SmallTagLabelComponent {
  @Input() label: string = ''
}
