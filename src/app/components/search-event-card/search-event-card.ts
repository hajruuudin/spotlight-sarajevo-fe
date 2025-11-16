import { Component, Input } from '@angular/core';
import { EventShorthandModel } from '../../models/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-event-card',
  imports: [DatePipe],
  templateUrl: './search-event-card.html',
  styleUrl: './search-event-card.css',
  host: {
    class: 'w-full dark:bg-black bg-(--primary-200) h-auto rounded-2xl outline-2 outline-(--primary-200) hover:outline-2 hover:outline-(--primary-500) flex flex-row justify-between items-stretch group'
  }
})
export class SearchEventCard {
  @Input() lang: string = ''
  @Input() event!: EventShorthandModel
}
