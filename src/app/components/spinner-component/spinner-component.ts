import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner-component',
  imports: [CommonModule],
  templateUrl: './spinner-component.html',
  styleUrl: './spinner-component.css'
})
export class SpinnerComponent {
  /** Show/hide the spinner */
  @Input() visible = false;

  /** Optional text below the spinner */
  @Input() message = 'Loading...';
}
