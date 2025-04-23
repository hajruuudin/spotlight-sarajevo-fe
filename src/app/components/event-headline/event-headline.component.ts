import { Component, Input, SimpleChanges } from '@angular/core';
import { EventShorthand } from '../../models/event-model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-event-headline',
  imports: [NgIf],
  templateUrl: './event-headline.component.html',
  styleUrl: './event-headline.component.css'
})
export class EventHeadlineComponent {
  @Input() event: EventShorthand | null = null;
  @Input() navigateToEventOverview: (eventId: number) => void = () => {};

  randomTag: string | null = null;

  ngOnInit(): void {
    this.setRandomTag();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] && changes['event'].currentValue) {
      this.setRandomTag();
    }
  }

  setRandomTag(): void {
    if (this.event?.tagNames && this.event.tagNames.length > 0) {
      this.randomTag = this.event.tagNames[Math.floor(Math.random() * this.event.tagNames.length)];
    } else {
      this.randomTag = null; // Or some default value
    }
  }
}
