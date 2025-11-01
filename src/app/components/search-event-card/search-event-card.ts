import { Component, Input } from '@angular/core';
import { EventShorthandModel } from '../../models/event.model';

@Component({
  selector: 'app-search-event-card',
  imports: [],
  templateUrl: './search-event-card.html',
  styleUrl: './search-event-card.css',
  host: {
    class: 'w-full bg-black h-auto rounded-2xl outline-2 outline-(--primary-200) hover:outline-2 hover:outline-(--primary-500) flex flex-row justify-between items-stretch group'
  }
})
export class SearchEventCard {
  @Input() eventShorthand!: EventShorthandModel
}
