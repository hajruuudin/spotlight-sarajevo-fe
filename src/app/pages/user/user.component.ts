import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarUserComponent } from '../../components/navbar-user/navbar-user.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, NavbarUserComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
