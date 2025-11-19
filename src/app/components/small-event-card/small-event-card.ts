import { Component, Input } from '@angular/core';
import { EventShorthandModel } from '../../shared/models/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-small-event-card',
  imports: [DatePipe],
  templateUrl: './small-event-card.html',
  styleUrl: './small-event-card.css',
  host: {
    class:
      'w-full min-w-md md:min-w-xl dark:bg-black bg-(--primary-200) h-auto rounded-2xl outline-2 dark:outline-(--primary-200) outline-(--primary-700) hover:outline-2 hover:dark:outline-(--primary-500) hover:outline-(--primary-100) flex flex-row justify-between group',
  },
})
export class SmallEventCard {
  @Input() lang: string = 'en';
  @Input() classAddons: String = '';
  @Input() event!: EventShorthandModel;
}
