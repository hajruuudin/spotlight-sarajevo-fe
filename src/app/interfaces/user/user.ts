import { Component } from '@angular/core';
import { NavbarUser } from "../../components/navbar-user/navbar-user";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user',
  imports: [NavbarUser, RouterOutlet],
  templateUrl: './user.html',
  styleUrl: './user.css',
  host: {
    class: "w-full flex flex-col justify-start items-stretch"
  }
})
export class User {

}
