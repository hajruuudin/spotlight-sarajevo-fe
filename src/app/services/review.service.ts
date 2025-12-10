import { Injectable } from '@angular/core';
import { PageResponseModel } from '../shared/models/shared.model';
import {
  SpotReviewCreateModel,
  SpotReviewModel,
  SpotReviewUpdateModel,
} from '../shared/models/spot.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

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
}
