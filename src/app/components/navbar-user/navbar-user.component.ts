import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.css'
})
export class NavbarUserComponent {
  isNavbarHovered : Boolean = false;
  isMobilNavbarLoaded : Boolean = false;

  showExtendedNavbar() {
    console.log("Navbar enter")
    this.isNavbarHovered = true
  }

  hideExtendedNavbar(){
    this.isNavbarHovered = false;
  }

  toggleNavbar(){
    this.isNavbarHovered = !this.isNavbarHovered
  }

  toggleMobileNavbar(){
    this.isMobilNavbarLoaded = !this.isMobilNavbarLoaded
  }
}
