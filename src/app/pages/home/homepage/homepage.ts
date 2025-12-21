import {
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { HeadlineEvent } from '../../../components/headline-event/headline-event';
import { EventShorthandModel } from '../../../shared/models/event.model';
import { SpotShorthandModel } from '../../../shared/models/spot.model';
import { HeadlineSpot } from '../../../components/headline-spot/headline-spot';
import { SmallSpotCard } from '../../../components/small-spot-card/small-spot-card';
import { TranslocoPipe } from '@ngneat/transloco';
import { SearchSpotCard } from '../../../components/search-spot-card/search-spot-card';
import { CalendarDateIcon } from '../../../components/calendar-date-icon/calendar-date-icon';
import { SearchEventCard } from '../../../components/search-event-card/search-event-card';
import { HistoricalSpotCard } from '../../../components/historical-spot-card/historical-spot-card';
import { EventCategoryModel, SpotCategoryModel } from '../../../shared/models/category.model';
import { CategoryService } from '../../../services/category.service';
import { CategoryCard } from '../../../components/category-card/category-card';
import { ButtonPrimary } from '../../../components/button-primary/button-primary';
import { SessionService } from '../../../core/services/session.service';
import { SpotService } from '../../../services/spot.service';
import { SortOptions } from '../../../shared/constants/SortOptions';
import { HotToastService } from '@ngxpert/hot-toast';
import { EventService } from '../../../services/event.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { ActivatedRoute } from '@angular/router';
import { HomepagePageData } from '../../../core/resolvers/homepage.resolver';

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
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastr: HotToastService,
    private spinner: SpinnerService
  ) {}

  protected selectedDate: string = '';
  public eventCalendarDays: any = [];

  ngOnInit(): void {
    const data = this.route.snapshot.data['homepageData'] as HomepagePageData;

    this.headlineSpot = data.headlineSpot;
    this.headlineEvent = data.headlineEvent;
    this.favouriteSpots = data.favouriteSpots;
    this.popularSpots = data.popularSpots;
    this.upcomingEvents = data.upcomingEvents;
    this.landmarkSpots = data.landmarkSpots;
    this.spotCategories = data.spotCategories;
    this.eventCategories = data.eventCategories;

    this.loadQueryAndDisplayDays();
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
