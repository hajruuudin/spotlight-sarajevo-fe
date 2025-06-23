import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel, EventUpdateModel } from '../models/event-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http : HttpClient) {}

  getHeadlineEvent(){
    return this.http.get("/api/event/shorthand/headline", {
      withCredentials: true
    })
  }

  getEventsByDate(selectedQueryDate : string){
    return this.http.get(`/api/event/${selectedQueryDate}`, {
      withCredentials: true
    })
  }

  getEventsShorthand(search: string, sort: string, categories: number[], pageNumber: number, pageSize: number){
    let url = `/api/event/shorthand?search=${search}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`

    categories.forEach(category => {
      url += `&categories=${category}`
    })

    return this.http.get(url, {
      withCredentials: true
    })
  }

  getEventOverviewBySlug(slug: string){
    return this.http.get<EventModel>(`/api/event/overview/${slug}`, {
      withCredentials: true
    })
  }

  updateEvent(eventUpdate: EventUpdateModel){
    return this.http.put<EventModel>(`/api/event/admin`, eventUpdate, {
      withCredentials: true
    })
  }
}
