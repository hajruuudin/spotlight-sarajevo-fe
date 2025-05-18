import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewModel } from '../models/review-model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {}

  addReviewForSpot(review: ReviewModel){
    return this.http.post('/api/review', review, {
      withCredentials: true
    })
  }

  getUserReview(spotId: number){
    return this.http.get(`/api/review/user?spotId=${spotId}`, {
      withCredentials: true
    })
  }

  getOtherSpotReviews(pageNumber: number, pageSize: number, spotId: number){
    return this.http.get(`/api/review?pageNumber=${pageNumber}&pageSize=${pageSize}&spotId=${spotId}`, {
      withCredentials: true
    })
  }

  deleteUserReview(spotId: number){
    return this.http.delete(`/api/review?spotId=${spotId}`, {
      withCredentials: true
    })
  }
}
