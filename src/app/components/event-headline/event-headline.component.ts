import { Component, Input } from '@angular/core';
import { EventShorthand } from '../../models/event-model';

@Component({
  selector: 'app-event-headline',
  imports: [],
  templateUrl: './event-headline.component.html',
  styleUrl: './event-headline.component.css'
})
export class EventHeadlineComponent {
  @Input() event: EventShorthand | null = null;
  @Input() navigateToEventOverview: (eventId: number) => void = () => {};
}
