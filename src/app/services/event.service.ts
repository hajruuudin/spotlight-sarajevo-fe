import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}
