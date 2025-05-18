import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EventModel } from '../models/event-model';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {
  private currentEventOverview = new BehaviorSubject<EventModel | null>(null);
  currentEventOverview$ = this.currentEventOverview.asObservable();

  constructor(private eventService: EventService) {}

  fetchAndSetEventOverview(eventSlug: string): Observable<EventModel> {
    return this.eventService.getEventOverviewBySlug(eventSlug).pipe(
      tap(overview => this.currentEventOverview.next(overview))
    );
  }

  getCurrentEventOverview(): EventModel | null {
    return this.currentEventOverview.getValue();
  }

  clearCurrentEventOverview(): void {
    this.currentEventOverview.next(null);
  }
}
