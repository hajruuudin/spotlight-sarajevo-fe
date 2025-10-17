import { Component } from '@angular/core';
import { HomepageIcon } from "../../resources/icons/homepage-icon/homepage-icon";
import { ProfileIcon } from "../../resources/icons/profile-icon/profile-icon";
import { DiscoverIcon } from "../../resources/icons/discover-icon/discover-icon";
import { SpotsIcon } from "../../resources/icons/spots-icon/spots-icon";
import { EventsIconComponent } from "../../resources/icons/events-icon/events-icon";
import { CollectionIcon } from "../../resources/icons/collection-icon/collection-icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar-user',
  imports: [HomepageIcon, ProfileIcon, DiscoverIcon, SpotsIcon, EventsIconComponent, CollectionIcon, RouterLink],
  templateUrl: './navbar-user.html',
  styleUrl: './navbar-user.css'
})
export class NavbarUser {

}
