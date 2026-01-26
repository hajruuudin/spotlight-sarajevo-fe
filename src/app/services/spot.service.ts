import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  SpotOverviewModel,
  SpotShorthandModel,
} from '../shared/models/spot.model';
import { PageResponseModel } from '../shared/models/shared.model';

/**
 * SpotService handles all available backend endpoints related to the spot object.
 * This includes (not limited to) basic CRUD operations
 * - Paginated spot GET method with custom search criteria
 * - POST method to create a spot, available only to admin users
 * - PUT method to update a spot, available only to admin users
 * - DELETE method to delete a spot from the database along with its information, available only to admin users
 * ... among other methods.
 *
 * Models and entities incorporated in the method: SpotShorthandModel, SpotModel
 *
 * All HTTP requests include credentials for cookie/session management.
 *
 * @version 1.0.0
 * @author hajrudin.imamovic
 */
@Injectable({
  providedIn: 'root',
})
export class SpotService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  /**
   * Method to retrieve paginated spot shorthands from the database based on specific search, sort and filter criteria.
   *
   * @param pageNumber The number of the page that is being retrieved (0-indexed, so the first page starts at 0)
   * @param pageSize The size of the page (dependable on the use of the method but should not exceed 25)
   * @param searchTerm The search query specified by the user in the search bar (Spots are searched against their Official Name as specified on Google Maps / any reliable online resource)
   * @param sortOption The sorting option specified by the user
   * @param categoryIds The category Ids by which the user filters the result. If left empty, all spot categories will be taken into account.
   * @returns An sorted page of Spot Shothand results
   *
   */
  findSpotsPaginated(
    pageNumber: number,
    pageSize: number,
    searchTerm: string,
    sortOption: string,
    categoryIds: number[]
  ) {
    return this.http.get<PageResponseModel<SpotShorthandModel>>(
      this.apiUrl +
        `/spot/find-spots?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortOption=${sortOption}&categoryIds=${categoryIds}`,
      {
        withCredentials: true,
      }
    );
  }

  /**
   * Method to retrieve detailed overview information about a specific spot by its slug.
   *
   * @param spotSlug The unique string identifier for the spot
   * @returns The detailed spot overview information
   */
  findSpotOverview(spotSlug: string) {
    return this.http.get<SpotOverviewModel>(
      this.apiUrl + `/spot/find-spot-overview?spotSlug=${spotSlug}`,
      {
        withCredentials: true,
      }
    );
  }

  /**
   * Method to check if a spot is marked as visited by the current user.
   * @param spotId The ID of the spot to check
   * @returns A boolean indicating if the spot is marked as visited
   */
  checkIfSpotIsVisited(spotId: number) {
    return this.http.get<Boolean>(
      this.apiUrl + `/spot/visited-spot/check?spotId=${spotId}`,
      {
        withCredentials: true,
      }
    );
  }

  /**
   * Method to add a spot to the user's visited spots list.
   * 
   * @param spotId The ID of the spot to be added as visited
   * @returns An observable representing the result of the add operation
   */
  addSpotAsVisited(spotId: number) {
    return this.http.post(
      this.apiUrl + `/user/visited-spot/add`,
      {
        spotId: spotId
      },
      {
        withCredentials: true,
      }
    );
  }

  /**
   * Method to remove a spot from the user's visited spots list.
   * @param spotId The ID of the spot to be removed from visited
   * @returns An observable representing the result of the remove operation
   */
  removeSpotFromVisited(spotId: number) {
    return this.http.delete(
      this.apiUrl + `/user/visited-spot/remove?spotId=${spotId}`,
      {
        withCredentials: true,
      }
    );
  }
}
