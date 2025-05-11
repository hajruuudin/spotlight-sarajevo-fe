import { Component, Input, SimpleChanges } from '@angular/core';
import { EventShorthand } from '../../models/event-model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-event-search',
  imports: [NgIf],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.css'
})
export class EventSearchComponent {
  @Input() event: EventShorthand | null = null;
  @Input() widthOption: string = ''
  @Input() navigateToEventOverview: (spotId: number) => void = () => {};
  
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
