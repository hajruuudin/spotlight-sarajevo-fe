import { Component, Input } from '@angular/core';
import { fadeInOutAnimation } from '../../animations/app.animations';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-overview-heading',
  imports: [],
  templateUrl: './overview-heading.component.html',
  styleUrl: './overview-heading.component.css',
  animations: [
    trigger('expand', [
      transition('void => expanded', [
        style({ width: '0' }),
        animate('350ms ease-in-out', style({ width: '50%' })),
      ]),
    ]),
  ],
  host: {
    class: 'w-full'
  }
})
export class OverviewHeadingComponent {
  @Input() objectOfficialName = ""
  @Input() objectSmallDescription = ""
}
