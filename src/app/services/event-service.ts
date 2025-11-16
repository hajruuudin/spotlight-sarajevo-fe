import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PageResponseModel } from '../models/shared.model';
import { EventShorthandModel } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient){}

  /**
       * Method to retrieve paginated event shorthands from the database based on specific search, sort and filter criteria.
       * 
       * @param pageNumber The number of the page that is being retrieved (0-indexed, so the first page starts at 0)
       * @param pageSize The size of the page (dependable on the use of the method but should not exceed 25)
       * @param searchTerm The search query specified by the user in the search bar (Events are searched against their Official Name as specified on any reliable online resource)
       * @param sortOption The sorting option specified by the user
       * @param categoryIds The category Ids by which the user filters the result. If left empty, all event categories will be taken into account.
       * @returns A sorted page of Event Shothand results 
       * 
       */
      findEventsPaginated(pageNumber: number, pageSize: number, searchTerm: string, sortOption: string, categoryIds: number[]){
          return this.http.get<PageResponseModel<EventShorthandModel>>(this.apiUrl + `/event/find-events?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortOption=${sortOption}&categoryIds=${categoryIds}`, {
              withCredentials: true
          })
      }
}
