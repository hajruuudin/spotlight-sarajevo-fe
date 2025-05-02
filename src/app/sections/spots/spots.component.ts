import { Component } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-spots',
  imports: [HeadingComponent],
  templateUrl: './spots.component.html',
  styleUrl: './spots.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SpotsComponent {

}
