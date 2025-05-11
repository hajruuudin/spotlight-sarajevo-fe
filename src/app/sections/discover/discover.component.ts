import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { SpotService } from '../../services/spot.service';
import { EventService } from '../../services/event.service';
import { SpotShorthand } from '../../models/spot-model';
import { EventShorthand } from '../../models/event-model';
import { forkJoin } from 'rxjs';
import { SpotSearchComponent } from "../../components/spot-search/spot-search.component";
import { NgFor } from '@angular/common';
import { SpotDiscoverComponent } from "../../components/spot-discover/spot-discover.component";
import { LandmarkDiscoverComponent } from '../../components/landmark-discover/landmark-discover.component';
import { EventSearchComponent } from "../../components/event-search/event-search.component";
import { fadeInOutAnimation, fadeInOutComponentsAnimation } from '../../animations/app.animations';
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";

@Component({
  selector: 'app-discover',
  imports: [NgFor, HeadingComponent, SpotDiscoverComponent, LandmarkDiscoverComponent, EventSearchComponent, ButtonRegularComponent],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css',
  animations: [fadeInOutAnimation]
})
export class DiscoverComponent implements OnInit{
  recentlyAddedSpots: SpotShorthand[] = []
  historicalSites: SpotShorthand[] = []
  topRated: SpotShorthand[] = []
  upcomingEvents: EventShorthand[] = []
  personalSpots: SpotShorthand[] = []

  constructor(
    private spotService: SpotService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    forkJoin({
      recentlyAdded: this.spotService.getSpotShorthands('', 'date', [], 0, 10),
      historical: this.spotService.getSpotShorthands('', '', [1014, 1015], 0, 10),
      top: this.spotService.getSpotShorthands('', 'rating', [], 0, 10),
      events: this.eventService.getEventsShorthand('', 'date', [], 0, 10),
      personal: this.spotService.getSpotShorthands('', '', [], 0, 10)
    }).subscribe({
      next: (results: { recentlyAdded: any; historical: any; top: any; events: any; personal: any;}) => {
        this.recentlyAddedSpots = results.recentlyAdded['content'] as SpotShorthand[];
        this.historicalSites = results.historical['content'] as SpotShorthand[];
        this.topRated = results.top['content'] as SpotShorthand[];
        this.upcomingEvents = results.events['content'] as EventShorthand[];
        this.personalSpots = results.personal['content'] as SpotShorthand[];
      },
      error: (error) => {
        console.error('Error loading data:', error);
      },
    });
  }


}
