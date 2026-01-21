import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EventCategoryModel, SpotCategoryModel } from '../shared/models/category.model';

/**
 * Service for interacting with the Category API.
 * Provides methods to fetch spot and event categories.
 * All requests include credentials for authentication.
 * Models and entities incorporated in the methods: SpotCategoryModel, EventCategoryModel
 * 
 * @version 1.0.0
 * @author hajrudin.imamovic
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient){};

  /**
   * Method to retrieve all spot categories from the backend.
   * @returns An array of SpotCategoryModel objects representing all spot categories
   */
  getAllSpotCategories(){
    return this.http.get<SpotCategoryModel[]>(this.API_URL + '/category/allSpot', {
      withCredentials: true
    })
  }

  /**
   * Method to retrieve all event categories from the backend.
   * @returns An array of EventCategoryModel objects representing all event categories
   */
  getAllEventCategories(){
    return this.http.get<EventCategoryModel[]>(this.API_URL + '/category/allEvent', {
      withCredentials: true
    })
  }
}
