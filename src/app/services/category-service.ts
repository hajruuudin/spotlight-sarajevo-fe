import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from '../../environments/environment';
import { EventCategoryModel, SpotCategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient){};

  getAllSpotCategories(){
    return this.http.get<SpotCategoryModel[]>(this.API_URL + '/category/allSpot', {
      withCredentials: false
    })
  }

  getAllEventCategories(){
    return this.http.get<EventCategoryModel[]>(this.API_URL + '/category/allEvent', {
      withCredentials: false
    })
  }
}
