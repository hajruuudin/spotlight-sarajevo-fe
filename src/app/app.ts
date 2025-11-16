import { Component, computed, OnInit, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "./components/spinner-component/spinner-component";
import { SpinnerService } from './services/spinner-service';
import { SessionService } from './services/session-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('spotlight-sarajevo-fe');
  protected loading = false;
  protected apiUrl = environment.API_URL

  constructor(private spinner: SpinnerService, private session: SessionService) {}

  get isLoading() {
    return this.spinner.loadingGlobal();
  }

}
