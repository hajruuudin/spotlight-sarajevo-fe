import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { EventOverviewModel } from "../../shared/models/event.model"
import { inject } from "@angular/core"
import { EventService } from "../../services/event.service"
import { map, switchMap } from "rxjs";

export const eventResolver: ResolveFn<{ event: EventOverviewModel, isAttended: Boolean }> = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const eventService = inject(EventService);
  const eventSlug = route.paramMap.get('eventSlug')!;

  return eventService.findEventOverview(eventSlug).pipe(
    switchMap((eventOverview) => {
      return eventService.checkIfEventIsAttended(eventOverview.id).pipe(
        map((isAttended) => ({
          event: eventOverview,
          isAttended: isAttended
        }))
      );
    })
  );
};