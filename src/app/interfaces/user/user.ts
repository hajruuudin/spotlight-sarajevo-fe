import { Component } from '@angular/core';
import { NavbarUser } from "../../components/navbar-user/navbar-user";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../components/footer/footer";


@Component({
  selector: 'app-user',
  imports: [NavbarUser, RouterOutlet, Footer],
  templateUrl: './user.html',
  styleUrl: './user.css',
  host: {
    class: "w-full flex flex-col justify-start items-stretch"
  }
})
export class User {

}
