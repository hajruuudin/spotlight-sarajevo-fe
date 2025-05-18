import { Component, Input } from '@angular/core';
import { ReviewModel } from '../../models/review-model';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-review-card',
  imports: [NgClass, NgIf],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
  host: {
    class: 'w-full h-auto'
  }
})
export class ReviewCardComponent {
  @Input() review: ReviewModel | null = null;
  @Input() isOwnReview: boolean = false;
}
