import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../../components/navbar-admin/navbar-admin.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [NavbarAdminComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
