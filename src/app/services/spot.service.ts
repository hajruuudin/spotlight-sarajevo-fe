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

  getAllSpots(){
    return this.http.get("/api/spot/shorthands", {
      withCredentials: true
    })
  }

  getSpotShorthands(search: string, sort: string, categories: number[], pageNumber: number, pageSize: number){
    let url = `/api/spot/shorthands?search=${search}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`

    categories.forEach(category => {
      url += `&categories=${category}`
    })

    return this.http.get(url, {
      withCredentials: true
    })
  }

  getCategorisedSpots(categoryId : number){
    return this.http.get(`/api/spot/category/${categoryId}`, {
      withCredentials: true
    })
  }
}
