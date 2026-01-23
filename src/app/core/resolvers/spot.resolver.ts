import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { SpotOverviewModel } from "../../shared/models/spot.model";
import { inject } from "@angular/core";
import { SpotService } from "../../services/spot.service";
import { map, switchMap } from "rxjs";

export const spotResolver: ResolveFn<{ spot: SpotOverviewModel, isVisited: Boolean }> = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const spotService = inject(SpotService);
  const spotSlug = route.paramMap.get('spotSlug')!;

  return spotService.findSpotOverview(spotSlug).pipe(
    switchMap((spotOverview) => {
      return spotService.checkIfSpotIsVisited(spotOverview.id).pipe(
        map((isVisited) => ({
          spot: spotOverview,
          isVisited: isVisited
        }))
      );
    })
  );
};