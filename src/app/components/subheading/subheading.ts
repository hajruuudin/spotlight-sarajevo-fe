import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subheading',
  imports: [],
  templateUrl: './subheading.html',
  styleUrl: './subheading.css',
  host: {
    class: 'w-1/2 md:w-1/4 h-auto flex flex-col justify-center items-center my-4'
  }
})
export class Subheading {
  @Input() subheading: string = 'SECTION'
}
