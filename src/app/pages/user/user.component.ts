import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarUserComponent } from '../../components/navbar-user/navbar-user.component';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, NavbarUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
