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
import {ActivatedRoute} from '@angular/router';
import {DiscoverPageData} from '../../../core/resolvers/discover.resolver';

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
    protected route: ActivatedRoute,
    protected session: SessionService,
    protected cdr: ChangeDetectorRef,
    protected toastr: HotToastService
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data['discoverData'] as DiscoverPageData
    
    this.recentlyAddedSpots = data.recentlyAddedSpots;
    this.landmarkSpots = data.landmarkSpots;
    this.upcomingEvents = data.upcomingEvents;
    this.favouriteSpots = data.favouriteSpots;
    this.popularSpots = data.popularSpots;
  }
}
