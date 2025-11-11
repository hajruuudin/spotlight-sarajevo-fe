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
import { SpotService } from '../../../services/spot-service';
import { SortOptions } from '../../../utils/enums/SortOptions';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SessionService } from '../../../services/session-service';

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
  protected lang!: string
  protected sub!: Subscription

  protected recentlyAddedSpots: SpotShorthandModel[] = []
  protected landmarkSpots: SpotShorthandModel[] = []
  protected popularSpots: SpotShorthandModel[] = []
  protected favouriteSpots: SpotShorthandModel[] = []

  constructor(
    protected spotService: SpotService,
    protected session: SessionService,
    protected cdr: ChangeDetectorRef,
    protected toastr: HotToastService
  ){}

  ngOnInit(): void {
    this.sub = this.session.language.subscribe(lang => {
      this.lang = lang
    })
    this.loadRecentlyAddedSpots()
    this.loadLandmarkSpots()
    this.loadPopularSpots()
    this.loadFavouriteSpots()
  }

  loadRecentlyAddedSpots(){
    this.spotService.findSpotsPaginated(0, 10, '', SortOptions.ALPHABETICAL.toString(), []).subscribe({
      next: (response: any) => {
        this.recentlyAddedSpots = response['content']
        this.cdr.detectChanges()
      },
      error: (response: HttpErrorResponse) => {
        this.toastr.error(response.message)
      }
    })
  }

  loadLandmarkSpots(){
    this.spotService.findSpotsPaginated(0, 10, '', SortOptions.ALPHABETICAL.toString(), []).subscribe({
      next: (response: any) => {
        this.landmarkSpots = response['content']
        this.cdr.detectChanges()
      },
      error: (response: HttpErrorResponse) => {
        this.toastr.error(response.message)
      }
    })
  }

  loadPopularSpots(){
    this.spotService.findSpotsPaginated(0, 10, '', SortOptions.ALPHABETICAL.toString(), []).subscribe({
      next: (response: any) => {
        this.popularSpots = response['content']
        this.cdr.detectChanges()
      },
      error: (response: HttpErrorResponse) => {
        this.toastr.error(response.message)
      }
    })
  }

  loadFavouriteSpots(){
    this.spotService.findSpotsPaginated(0, 10, '', SortOptions.ALPHABETICAL.toString(), []).subscribe({
      next: (response: any) => {
        this.favouriteSpots = response['content']
        this.cdr.detectChanges()
      },
      error: (response: HttpErrorResponse) => {
        this.toastr.error(response.message)
      }
    })
  }

  
    public testEvent = new EventShorthandModel(
      1,
      "Zeljko Joksimovic",
      "This is just a test event for the frotnend",
      "Concert",
      "https://i.ibb.co/q3TzQ4FH/Screenshot-2025-10-30-at-9-43-55-PM.png",
      "2024 august 12",
      ['Alcohol', 'Dance', 'Live']
    )
  
}
