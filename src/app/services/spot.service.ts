import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotModel, SpotUpdateModel } from '../models/spot-model';

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

  getSpotOverviewBySlug(spotSlug: string){
    return this.http.get<SpotModel>(`/api/spot/overview/${spotSlug}`, {
      withCredentials: true
    })
  }

  updateSpot(spotUpdate: SpotUpdateModel){
    return this.http.put<SpotModel>(`/api/spot/admin`, spotUpdate, {
      withCredentials: true
    })
  }
}
