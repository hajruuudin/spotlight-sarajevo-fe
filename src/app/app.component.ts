import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleOAuthProvider } from '@react-oauth/google';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spotlight-sarajevo-fe';
}
