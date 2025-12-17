import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { TranslocoPipe } from '@ngneat/transloco';
import { HotToastService } from '@ngxpert/hot-toast';
import { HistoricalSpotCard } from '../../../components/historical-spot-card/historical-spot-card';
import { SpotShorthandModel } from '../../../shared/models/spot.model';
import { EventShorthandModel } from '../../../shared/models/event.model';
import { ButtonPrimary } from '../../../components/button-primary/button-primary';
import { SmallSpotCard } from '../../../components/small-spot-card/small-spot-card';
import { SmallEventCard } from '../../../components/small-event-card/small-event-card';
import { SpotService } from '../../../services/spot.service';
import { SortOptions } from '../../../shared/constants/SortOptions';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';
import { SessionService } from '../../../core/services/session.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-discover',
  imports: [
    PageHeader,
    TranslocoPipe,
    ButtonPrimary,
    SmallSpotCard,
    HistoricalSpotCard,
    SmallEventCard,
  ],
  templateUrl: './discover.html',
  styleUrl: './discover.css',
  host: {
    class: 'flex flex-col w-full justify-start items-center',
  },
})
export class Discover implements OnInit {
  protected recentlyAddedSpots: SpotShorthandModel[] = [];
  protected landmarkSpots: SpotShorthandModel[] = [];
  protected popularSpots: SpotShorthandModel[] = [];
  protected upcomingEvents: EventShorthandModel[] = [];
  protected favouriteSpots: SpotShorthandModel[] = [];

  constructor(
    protected spotService: SpotService,
    protected eventService: EventService,
    protected session: SessionService,
    protected cdr: ChangeDetectorRef,
    protected toastr: HotToastService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    forkJoin({
      recentlyAddedSpots: this.spotService.findSpotsPaginated(
        0,
        10,
        '',
        SortOptions.ALPHABETICAL.toString(),
        []
      ),
      landmarkSpots: this.spotService.findSpotsPaginated(
        0,
        10,
        '',
        SortOptions.ALPHABETICAL.toString(),
        []
      ),
      popularSpots: this.spotService.findSpotsPaginated(
        0,
        10,
        '',
        SortOptions.ALPHABETICAL.toString(),
        []
      ),
      upcomingEvents: this.eventService.findEventsPaginated(
        0,
        10,
        '',
        SortOptions.ALPHABETICAL.toString(),
        []
      ),
      favouriteSpots: this.spotService.findSpotsPaginated(
        0,
        10,
        '',
        SortOptions.ALPHABETICAL.toString(),
        []
      ),
    }).subscribe({
      next: (result) => {
        this.recentlyAddedSpots = result.recentlyAddedSpots.content;
        this.landmarkSpots = result.landmarkSpots.content;
        this.popularSpots = result.popularSpots.content;
        this.upcomingEvents = result.upcomingEvents.content;
        this.favouriteSpots = result.favouriteSpots.content;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      },
    });
  }
}
