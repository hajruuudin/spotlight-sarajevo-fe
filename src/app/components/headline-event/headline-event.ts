import { Component, input, Input } from '@angular/core';
import { EventShorthandModel } from '../../models/event.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-headline-event',
  imports: [NgClass],
  templateUrl: './headline-event.html',
  styleUrl: './headline-event.css',
})
export class HeadlineEvent {
  @Input() classAddons: String = '';
  @Input() eventShorthand!: EventShorthandModel; 
}
