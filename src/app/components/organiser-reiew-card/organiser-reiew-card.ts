import { Component, Input } from '@angular/core';
import { EventOrganiserReviewModel } from '../../shared/models/event.model';
import { DatePipe, NgClass } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-organiser-reiew-card',
  imports: [NgClass, DatePipe, TranslocoPipe],
  templateUrl: './organiser-reiew-card.html',
  styleUrl: './organiser-reiew-card.css',
  host: {
    class: 'w-full h-auto rounded-2xl dark:bg-(--background-200) bg-(--background-900) border-2 dark:border-(--primary-300) border-(--primary-500) flex flex-col justify-between items-center py-2 px-4'
  }
})
export class OrganiserReiewCard {
  @Input() review!: EventOrganiserReviewModel
}
