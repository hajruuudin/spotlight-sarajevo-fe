import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { SpotHeadlineComponent } from "../../components/spot-headline/spot-headline.component";
import { SpotShorthand } from '../../models/spot-model';
import { SpotService } from '../../services/spot.service';
import { EventShorthand } from '../../models/event-model';
import { EventService } from '../../services/event.service';
import { EventHeadlineComponent } from "../../components/event-headline/event-headline.component";
import { SpotDiscoverComponent } from "../../components/spot-discover/spot-discover.component";
import { NgFor, NgIf } from '@angular/common';
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";
import { SpotSearchComponent } from "../../components/spot-search/spot-search.component";
import { CalendarDayComponent } from "../../components/calendar-day/calendar-day.component";
import { EventSearchComponent } from "../../components/event-search/event-search.component";
import { LandmarkDiscoverComponent } from "../../components/landmark-discover/landmark-discover.component";
import { CategoryService } from '../../services/category.service';
import { CategoryBlockComponent } from "../../components/category-block/category-block.component";

@Component({
  selector: 'app-homepage',
  imports: [NgFor, NgIf, HeadingComponent, SpotHeadlineComponent, EventHeadlineComponent, SpotDiscoverComponent, ButtonRegularComponent, SpotSearchComponent, CalendarDayComponent, EventSearchComponent, LandmarkDiscoverComponent, CategoryBlockComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  headlineSpot : SpotShorthand | null = null;
  headlineEvent : EventShorthand | null = null;
  spots : SpotShorthand[] | null = null;
  eventsCalendarDays : any = []
  selectedDate: string | null = null;

  iconicPlaces : any = []
  categories : any = []

  calendarEvents : any = []

  navigateToSpotOverview: (spotId: number) => void = () => {console.log("Clicked")};
  navigateToEventOverview: (eventId: number) => void = () => {console.log("Clicked")};

  constructor(
    private spotService : SpotService,
    private eventService : EventService,
    private categoryService : CategoryService
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

    this.loadQueryAndDisplayDays()
    this.loadLandmarkSpots()
    this.loadCategories()
  }

  loadQueryAndDisplayDays() {
    this.eventsCalendarDays = [];
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
  
      this.eventsCalendarDays.push({
        queryDate: formattedDate,
        displayInfo: { day: dayOfWeek, date: dayOfMonth },
      });
  
      date.setDate(date.getDate() + 1);
    }
    
    this.selectedDate = this.eventsCalendarDays[0].queryDate
    this.loadEventsForDate(this.eventsCalendarDays[0].queryDate);
  }

  handleDaySelection(selectedQueryDate: string) {
    this.selectedDate = selectedQueryDate;
    this.loadEventsForDate(selectedQueryDate);
  }

  loadEventsForDate(selectedQueryDate : string){
    this.eventService.getEventsByDate(selectedQueryDate).subscribe({
      next: (response : any) => {
        this.calendarEvents = response['content']
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  }

  loadLandmarkSpots() {
    this.spotService.getCategorisedSpots(1014).subscribe({
      next: (response : any) => {
        this.iconicPlaces = response['content']
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  }

  loadCategories() {
    this.categoryService.fetchCategories().subscribe({
      next: (response : any) => {
        this.categories = response['content']
      },
      error: (error : Error) => {
        console.error(error)
      }
    })
  }
}
