import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { SpotOverviewModel } from "../../shared/models/spot.model";
import { inject } from "@angular/core";
import { SpotService } from "../../services/spot.service";

export const spotResolver: ResolveFn<SpotOverviewModel> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const spotService = inject(SpotService)
    const spotSlug = route.paramMap.get('spotSlug')!
    return spotService.findSpotOverview(spotSlug)
}