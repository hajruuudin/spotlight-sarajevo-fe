import { Component, OnInit } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { HeadlineEvent } from "../../../components/headline-event/headline-event";
import { EventShorthandModel } from '../../../models/event.model';
import { SpotShorthandModel } from '../../../models/spot.model';
import { HeadlineSpot } from '../../../components/headline-spot/headline-spot';
import { SmallSpotCard } from '../../../components/small-spot-card/small-spot-card';
import { ButtonRegular } from "../../../components/button-regular/button-regular";
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { SearchSpotCard } from "../../../components/search-spot-card/search-spot-card";
import { CalendarDateIcon } from '../../../components/calendar-date-icon/calendar-date-icon';
import { SearchEventCard } from "../../../components/search-event-card/search-event-card";
import { HistoricalSpotCard } from "../../../components/historical-spot-card/historical-spot-card";
import { EventCategoryModel, SpotCategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryCard } from '../../../components/category-card/category-card';

@Component({
  selector: 'app-homepage',
  imports: [PageHeader, HeadlineEvent, HeadlineSpot, SmallSpotCard, ButtonRegular, TranslocoPipe, SearchSpotCard, CalendarDateIcon, SearchEventCard, HistoricalSpotCard, CategoryCard],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})

export class Homepage implements OnInit{
  protected selectedDate: string = ''
  public eventCalendarDays : any = []

  public spotCategories : SpotCategoryModel[] = []
  public eventCategories : EventCategoryModel[] = []

  constructor(
    public transloco: TranslocoService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.loadSpotAndEventCategories()
    this.loadQueryAndDisplayDays()
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

  loadQueryAndDisplayDays() {
    this.eventCalendarDays = [];
    let date = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    for (let i = 0; i < 7; i++) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayOfMonthPadded = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${dayOfMonthPadded}`;
      const dayOfWeekIndex = date.getDay();
      const dayOfWeek = daysOfWeek[dayOfWeekIndex];
      const dayOfMonth = date.getDate();
  
      this.eventCalendarDays.push({
        queryDate: formattedDate,
        displayInfo: { day: dayOfWeek, date: dayOfMonth },
      });
  
      date.setDate(date.getDate() + 1);
    }
    
    this.selectedDate = this.eventCalendarDays[0].queryDate
    // this.loadEventsForDate(selectedQueryDate);
  }

  handleDaySelection(selectedQueryDate: string) {
    this.selectedDate = selectedQueryDate;
    // this.loadEventsForDate(selectedQueryDate);
  }

  loadSpotAndEventCategories(){
    this.categoryService.getAllSpotCategories().subscribe({
      next: (response : SpotCategoryModel[]) => {
        this.spotCategories = response
      },
      error: (response : HttpErrorResponse) => {
        console.error(response)
      }
    })

    this.categoryService.getAllEventCategories().subscribe({
      next: (response : EventCategoryModel[]) => {
        this.eventCategories = response
      },
      error: (response : HttpErrorResponse) => {
        console.error(response)
      }
    })
  }
}
