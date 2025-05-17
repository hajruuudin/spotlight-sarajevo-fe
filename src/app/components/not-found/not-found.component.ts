import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [NgIf],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  host: {
    class: 'w-full h-96 relative flex flex-col justify-center items-center'
  }
})
export class NotFoundComponent {
  @Input() head = '';
  @Input() message = ''
  @Input() messageContinued = ''

}
