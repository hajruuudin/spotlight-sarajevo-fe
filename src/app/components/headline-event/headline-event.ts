import { Component, input, Input } from '@angular/core';
import { EventShorthandModel } from '../../shared/models/event.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-headline-event',
  imports: [NgClass],
  templateUrl: './headline-event.html',
  styleUrl: './headline-event.css',
})
export class HeadlineEvent {
  @Input() lang: String = 'en';
  @Input() classAddons: String = '';
  @Input() event!: EventShorthandModel;
}
