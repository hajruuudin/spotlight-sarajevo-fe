import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { HeadlineEvent } from '../../../components/headline-event/headline-event';
import { EventShorthandModel } from '../../../models/event.model';
import { SpotShorthandModel } from '../../../models/spot.model';
import { HeadlineSpot } from '../../../components/headline-spot/headline-spot';
import { SmallSpotCard } from '../../../components/small-spot-card/small-spot-card';
import { TranslocoPipe } from '@ngneat/transloco';
import { SearchSpotCard } from '../../../components/search-spot-card/search-spot-card';
import { CalendarDateIcon } from '../../../components/calendar-date-icon/calendar-date-icon';
import { SearchEventCard } from '../../../components/search-event-card/search-event-card';
import { HistoricalSpotCard } from '../../../components/historical-spot-card/historical-spot-card';
import { EventCategoryModel, SpotCategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryCard } from '../../../components/category-card/category-card';
import { ButtonPrimary } from '../../../components/button-primary/button-primary';
import { SessionService } from '../../../services/session-service';
import { SpotService } from '../../../services/spot-service';
import { SortOptions } from '../../../utils/enums/SortOptions';
import { HotToastService } from '@ngxpert/hot-toast';
import { forkJoin, Subscription } from 'rxjs';
import { EventService } from '../../../services/event-service';

@Component({
  selector: 'app-homepage',
  imports: [
    PageHeader,
    HeadlineEvent,
    HeadlineSpot,
    SmallSpotCard,
    TranslocoPipe,
    SearchSpotCard,
    CalendarDateIcon,
    SearchEventCard,
    HistoricalSpotCard,
    CategoryCard,
    ButtonPrimary,
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
  host: {
    class: 'flex flex-col w-full justify-start items-center',
  },
})
export class Homepage implements OnInit {
  protected headlineSpot: SpotShorthandModel | null = null;
  protected headlineEvent: EventShorthandModel | null = null;
  protected favouriteSpots: SpotShorthandModel[] = [];
  protected popularSpots: SpotShorthandModel[] = [];
  protected upcomingEvents: EventShorthandModel[] = [];
  protected landmarkSpots: SpotShorthandModel[] = [];
  public spotCategories: SpotCategoryModel[] = [];
  public eventCategories: EventCategoryModel[] = [];

  constructor(
    public spotService: SpotService,
    public eventService: EventService,
    public session: SessionService,
    public cdr: ChangeDetectorRef,
    private categoryService: CategoryService,
    private toastr: HotToastService
  ) {}

  protected lang!: string;
  protected sub!: Subscription;
  protected selectedDate: string = '';
  public eventCalendarDays: any = [];

  ngOnInit(): void {
    this.sub = this.session.language.subscribe((lang) => {
      this.lang = lang;
    });
    this.loadInitialData();
    this.loadQueryAndDisplayDays();
  }

  loadInitialData() {
    forkJoin({
      headlineSpot: this.spotService.findSpotsPaginated(
        0,
        1,
        '',
        SortOptions.ALPHABETICAL.toString(),
        []
      ),
      headlineEvent: this.eventService.findEventsPaginated(
        0,
        1,
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
      landmarkSpots: this.spotService.findSpotsPaginated(
        0,
        10,
        '',
        SortOptions.ALPHABETICAL.toString(),
        []
      ),
      spotCategories: this.categoryService.getAllSpotCategories(),
      eventCategories: this.categoryService.getAllEventCategories(),
    }).subscribe({
      next: (result) => {
        this.headlineSpot = result.headlineSpot.content[0];
        this.headlineEvent = result.headlineEvent.content[0];

        this.favouriteSpots = result.favouriteSpots.content;
        this.popularSpots = result.popularSpots.content;
        this.upcomingEvents = result.upcomingEvents.content;
        this.landmarkSpots = result.landmarkSpots.content;

        this.spotCategories = result.spotCategories;
        this.eventCategories = result.eventCategories;

        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      },
    });
  }

  loadQueryAndDisplayDays() {
    this.eventCalendarDays = [];
    let date = new Date();
    const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysOfWeekBs = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']; // 05.11.2025: Fix this sometime, needs to load the days based on language

    for (let i = 0; i < 7; i++) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayOfMonthPadded = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${dayOfMonthPadded}`;
      const dayOfWeekIndex = date.getDay();
      const dayOfWeek = daysOfWeekEn[dayOfWeekIndex];
      const dayOfMonth = date.getDate();

      this.eventCalendarDays.push({
        queryDate: formattedDate,
        displayInfo: { day: dayOfWeek, date: dayOfMonth },
      });

      date.setDate(date.getDate() + 1);
    }

    this.selectedDate = this.eventCalendarDays[0].queryDate;
    // this.loadEventsForDate(selectedQueryDate); // Handle this after inserting events into the system
  }

  handleDaySelection(selectedQueryDate: string) {
    this.selectedDate = selectedQueryDate;
    // this.loadEventsForDate(selectedQueryDate); // Handle this after inserting events into the system (possibly after admin panel is made)
  }
}
