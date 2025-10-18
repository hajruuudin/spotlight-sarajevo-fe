import { Component } from '@angular/core';
import { HomepageIcon } from "../../resources/icons/homepage-icon/homepage-icon";
import { ProfileIcon } from "../../resources/icons/profile-icon/profile-icon";
import { DiscoverIcon } from "../../resources/icons/discover-icon/discover-icon";
import { SpotsIcon } from "../../resources/icons/spots-icon/spots-icon";
import { EventsIconComponent } from "../../resources/icons/events-icon/events-icon";
import { CollectionIcon } from "../../resources/icons/collection-icon/collection-icon";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GuidesIcon } from "../../resources/icons/guides-icon/guides-icon";
import { RequestIcon } from "../../resources/icons/request-icon/request-icon";
import { TransportIcon } from "../../resources/icons/transport-icon/transport-icon";
import { HamburgerIcon } from "../../resources/icons/hamburger-icon/hamburger-icon";
import { Profile } from "../../pages/user-pages/profile/profile";

@Component({
  selector: 'app-navbar-user',
  imports: [HomepageIcon, ProfileIcon, DiscoverIcon, SpotsIcon, EventsIconComponent, CollectionIcon, RouterLink, GuidesIcon, RequestIcon, TransportIcon, HamburgerIcon, RouterLinkActive, Profile],
  templateUrl: './navbar-user.html',
  styleUrl: './navbar-user.css'
})
export class NavbarUser {
  protected isMobileNavbarLoaded : Boolean = true;
  protected isMobileNavbarOpen = false; 

  toggleMobileNavbar() {
    this.isMobileNavbarOpen = !this.isMobileNavbarOpen;
  }
}
