import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SpotModel } from '../models/spot-model';
import { SpotService } from './spot.service';

@Injectable({
  providedIn: 'root'
})
export class SpotDataService {
  private currentSpotOverview = new BehaviorSubject<SpotModel | null>(null);
  currentSpotOverview$ = this.currentSpotOverview.asObservable();

  constructor(private spotService: SpotService) {}

  fetchAndSetSpotOverview(spotSlug: string): Observable<SpotModel> {
    return this.spotService.getSpotOverviewBySlug(spotSlug).pipe(
      tap(overview => this.currentSpotOverview.next(overview))
    );
  }

  getCurrentSpotOverview(): SpotModel | null {
    return this.currentSpotOverview.getValue();
  }

  clearCurrentSpotOverview(): void {
    this.currentSpotOverview.next(null);
  }
}
