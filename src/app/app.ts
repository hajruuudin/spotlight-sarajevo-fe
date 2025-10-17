import { Component, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('spotlight-sarajevo-fe');

  protected apiUrl = environment.API_URL
}
