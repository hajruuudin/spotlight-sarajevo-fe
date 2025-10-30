import { Component, OnInit } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { HeadlineEvent } from "../../../components/headline-event/headline-event";
import { EventShorthandModel } from '../../../models/event.model';
import { SpotShorthandModel } from '../../../models/spot.model';
import { HeadlineSpot } from '../../../components/headline-spot/headline-spot';
import { SmallSpotCard } from '../../../components/small-spot-card/small-spot-card';
import { ButtonRegular } from "../../../components/button-regular/button-regular";
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-homepage',
  imports: [PageHeader, HeadlineEvent, HeadlineSpot, SmallSpotCard, ButtonRegular, TranslocoPipe],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Homepage implements OnInit{

  constructor(
    public transloco: TranslocoService
  ){}

  ngOnInit(): void {
    
  }
  public testSpot = new SpotShorthandModel(
    1,
    "Kilim Ilidza",
    "This is just a test spot for the frotnend",
    "Cafe",
    "https://i.ibb.co/7HWPLBJ/Screenshot-2025-10-30-at-9-13-33-PM.png",
    "2024 august 12",
    ['Alcohol', 'Dance', 'Live']
  )

  public testEvent = new EventShorthandModel(
    1,
    "Zeljko Joksimovic",
    "This is just a test event for the frotnend",
    "Concert",
    "https://i.ibb.co/q3TzQ4FH/Screenshot-2025-10-30-at-9-43-55-PM.png",
    "2024 august 12",
    ['Alcohol', 'Dance', 'Live']
  )

  public testSpotFavourites: SpotShorthandModel[] = [
    this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot
  ]

  
}
