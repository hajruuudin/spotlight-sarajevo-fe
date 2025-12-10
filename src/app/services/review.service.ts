import { Injectable } from '@angular/core';
import { PageResponseModel } from '../shared/models/shared.model';
import {
  SpotReviewCreateModel,
  SpotReviewModel,
  SpotReviewUpdateModel,
} from '../shared/models/spot.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventOrganiserModel, EventOrganiserReviewCreateModel, EventOrganiserReviewModel, EventOrganiserReviewUpdateModel } from '../shared/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  /* ============================================================= */
  /* ==================== SPOT REVIEWS CRUD ====================== */
  /* ============================================================= */

  findAllSpotReviews(pageNumber: number, pageSize: number, spotId: number, sortOption: string) {
    return this.http.get<PageResponseModel<SpotReviewModel>>(
      this.apiUrl +
        `/review/spot/find-spot-reviews?pageNumber=${pageNumber}&pageSize=${pageSize}&spotId=${spotId}&sortOption=${sortOption}`,
      {
        withCredentials: true,
      }
    );
  }

  findUserSpotReview(spotId: number) {
    return this.http.get<SpotReviewModel>(this.apiUrl + `/review/spot/find-user-review?spotId=${spotId}`, {
      withCredentials: true,
    });
  }

  addSpotReview(spotReviewCreate: SpotReviewCreateModel) {
    return this.http.post<SpotReviewModel>(this.apiUrl + `/review/spot/add-review`, spotReviewCreate, {
      withCredentials: true,
    });
  }

  updateSpotReview(spotReviewUpdate: SpotReviewUpdateModel) {
    return this.http.put<SpotReviewModel>(this.apiUrl + `/review/spot/update-review`, spotReviewUpdate, {
      withCredentials: true,
    });
  }

  deleteSpotReview(spotId: number, reviewId: number) {
    return this.http.delete<SpotReviewModel>(
      this.apiUrl + `/review/spot/remove-review?spotId=${spotId}&reviewId=${reviewId}`,
      {
        withCredentials: true,
      }
    );
  }

  /* ======================================================================== */
  /* ==================== EVENT ORGANISER REVIEWS CRUD ====================== */
  /* ======================================================================== */

  findAllEventOrganiserReviews(pageNumber: number, pageSize: number, organiserId: number, sortOption: string) {
    return this.http.get<PageResponseModel<EventOrganiserReviewModel>>(
      this.apiUrl +
        `/review/organiser/find-organiser-reviews?pageNumber=${pageNumber}&pageSize=${pageSize}&organiserId=${organiserId}&sortOption=${sortOption}`,
      {
        withCredentials: true,
      }
    );
  }

  findUserEventOrganiserReview(organiserId: number) {
    return this.http.get<EventOrganiserReviewModel>(
      this.apiUrl + `/review/event-organiser/find-user-review?organiserId=${organiserId}`, 
      {
        withCredentials: true,
      }
    );
  }

  addEventOrganiserReview(reviewCreate: EventOrganiserReviewCreateModel) {
    return this.http.post<EventOrganiserReviewModel>(
      this.apiUrl + `/review/event-organiser/add-review`, 
      reviewCreate, 
      {
        withCredentials: true,
      }
    );
  }

  updateEventOrganiserReview(reviewUpdate: EventOrganiserReviewUpdateModel) {
    return this.http.put<EventOrganiserReviewModel>(
      this.apiUrl + `/review/event-organiser/update-review`, 
      reviewUpdate, 
      {
        withCredentials: true,
      }
    );
  }

  deleteEventOrganiserReview(organiserId: number, reviewId: number) {
    return this.http.delete<EventOrganiserReviewModel>(
      this.apiUrl + `/review/event-organiser/remove-review?organiserId=${organiserId}&reviewId=${reviewId}`,
      {
        withCredentials: true,
      }
    );
  }
}
