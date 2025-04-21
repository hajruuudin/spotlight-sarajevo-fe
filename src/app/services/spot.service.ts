import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  constructor(private http : HttpClient) {}

  getHeadlineSpot(){
    return this.http.get("/api/spot/shorthand/headline", {
      withCredentials: true
    })
  }


}
