import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar-user',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.css',
  animations: [
    trigger('mobileNavAnimation', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => in', animate('300ms ease-out')),
      transition('in => void', animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 })))
    ])
  ]
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
