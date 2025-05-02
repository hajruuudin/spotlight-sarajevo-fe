import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css',
  host: {
    class: "w-full"
  },
  animations: [
    trigger('expand', [
      transition('void => expanded', [
        style({ width: '0' }),
        animate('350ms ease-in-out', style({ width: '50%' })),
      ]),
    ]),
  ],
})
export class HeadingComponent {
  @Input() title : string = "";
}
