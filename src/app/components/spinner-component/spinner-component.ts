import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner-component',
  imports: [CommonModule],
  templateUrl: './spinner-component.html',
  styleUrl: './spinner-component.css'
})
export class SpinnerComponent {
  constructor(public spinner: SpinnerService) {}
}
