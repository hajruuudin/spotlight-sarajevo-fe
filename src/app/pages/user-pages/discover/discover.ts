import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { TranslocoPipe, TranslocoService, TranslocoDirective } from '@ngneat/transloco';
import { HotToastService } from '@ngxpert/hot-toast';
import { HistoricalSpotCard } from "../../../components/historical-spot-card/historical-spot-card";
import { SpotShorthandModel } from '../../../models/spot.model';
import { EventShorthandModel } from '../../../models/event.model';
import { ButtonPrimary } from "../../../components/button-primary/button-primary";
import { SmallSpotCard } from "../../../components/small-spot-card/small-spot-card";
import { SmallEventCard } from "../../../components/small-event-card/small-event-card";

@Component({
  selector: 'app-discover',
  imports: [PageHeader, TranslocoPipe, ButtonPrimary, SmallSpotCard, HistoricalSpotCard, SmallEventCard],
  templateUrl: './discover.html',
  styleUrl: './discover.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Discover implements OnInit{
  constructor(
    protected lang: TranslocoService,
    protected cdr: ChangeDetectorRef,
    protected toastr: HotToastService
  ){}

  ngOnInit(): void {
  
  }

  public testSpot = new SpotShorthandModel(
      1,
      "Kilim Ilidza",
      "This is just a test spot for the frotnend",
      "Cafe",
      "https://i.ibb.co/7HWPLBJ/Screenshot-2025-10-30-at-9-13-33-PM.png",
      "9.4",
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
