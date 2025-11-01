import { Component, Input } from '@angular/core';
import { EventShorthandModel } from '../../models/event.model';

@Component({
  selector: 'app-small-event-card',
  imports: [],
  templateUrl: './small-event-card.html',
  styleUrl: './small-event-card.css',
  host: {
    class: 'w-full min-w-md md:min-w-xl bg-black h-auto rounded-2xl outline-2 outline-(--primary-200) hover:outline-2 hover:outline-(--primary-500) flex flex-row justify-between group'
  }
})
export class SmallEventCard {
  @Input() classAddons: String = '';
  @Input() eventShorthand!: EventShorthandModel;
}
