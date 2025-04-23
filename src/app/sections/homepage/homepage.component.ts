import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { SpotHeadlineComponent } from "../../components/spot-headline/spot-headline.component";
import { SpotShorthand } from '../../models/spot-model';
import { SpotService } from '../../services/spot.service';
import { EventShorthand } from '../../models/event-model';
import { EventService } from '../../services/event.service';
import { EventHeadlineComponent } from "../../components/event-headline/event-headline.component";
import { SpotDiscoverComponent } from "../../components/spot-discover/spot-discover.component";
import { NgFor } from '@angular/common';
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";

@Component({
  selector: 'app-homepage',
  imports: [NgFor, HeadingComponent, SpotHeadlineComponent, EventHeadlineComponent, SpotDiscoverComponent, ButtonRegularComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  headlineSpot : SpotShorthand | null = null;
  headlineEvent : EventShorthand | null = null;
  spots : SpotShorthand[] | null = null;
  navigateToSpotOverview: (spotId: number) => void = () => {console.log("Clicked")};
  navigateToEventOverview: (eventId: number) => void = () => {console.log("Clicked")};

  constructor(
    private spotService : SpotService,
    private eventService : EventService
  ) {}


  ngOnInit(): void {
    this.spotService.getHeadlineSpot().subscribe({
      next: (response : any) => {
        this.headlineSpot = response
      },
      error: (error : Error) => {
        console.error(error)
      }
    })

    this.eventService.getHeadlineEvent().subscribe({
      next: (response : any) => {
        this.headlineEvent = response
      },
      error: (error: Error) => {
        console.error(error)
      }
    })

    this.spotService.getAllSpots().subscribe({
      next: (response: any) => {
        this.spots = response['content']
      }
    })
  }
}
