import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TouristGuideCreateModel, TouristGuideOverviewModel, TouristGuideShorthandModel } from '../shared/models/tourist.guide.model';
import { environment } from '../../environments/environment';

/**
 * Service for interacting with the Tourist Guide API.
 * Provides methods to fetch tourist guides and create new ones.
 * All requests include credentials for authentication.
 * 
 * Models and entities incorporated in the methods: TouristGuideShorthandModel, TouristGuideOverviewModel, TouristGuideCreateModel
 * 
 * @version 1.0.0
 * @author hajrudin.imamovic
 */
@Injectable({
  providedIn: 'root'
})
export class TouristGuideService {
  private API_URL = environment.API_URL + '/guide';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all tourist guides in shorthand format
   */
  findAllGuides(): Observable<TouristGuideShorthandModel[]> {
    return this.http.get<TouristGuideShorthandModel[]>(`${this.API_URL}/all`, {
      withCredentials: true
    });
  }

  /**
   * Fetches guides based on a specific category ID
   * @param categoryId The ID of the category to filter guides by
   */
  findGuidesByCategory(categoryId: number): Observable<TouristGuideShorthandModel[]> {
    return this.http.get<TouristGuideShorthandModel[]>(`${this.API_URL}/category/${categoryId}`, {
      withCredentials: true
    });
  }

  /**
   * Fetches a specific guide overview by its slug
   * @param slug The unique string identifier for the guide
   */
  findGuideOverview(slug: string): Observable<TouristGuideOverviewModel> {
    return this.http.get<TouristGuideOverviewModel>(`${this.API_URL}/${slug}`, {
      withCredentials: true
    });
  }

  /**
   * Creates a new tourist guide
   * @param request The guide creation data
   */
  createGuide(request: TouristGuideCreateModel): Observable<TouristGuideOverviewModel> {
    return this.http.post<TouristGuideOverviewModel>(`${this.API_URL}/create`, request, {
      withCredentials: true
    });
  }
}