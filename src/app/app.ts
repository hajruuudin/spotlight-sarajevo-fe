import { Component, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { HomepageIcon } from "./resources/icons/homepage-icon/homepage-icon";

@Component({
  selector: 'app-root',
  imports: [HomepageIcon],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('spotlight-sarajevo-fe');

  protected apiUrl = environment.API_URL
}
