import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { EventOverviewModel } from "../../shared/models/event.model"
import { inject } from "@angular/core"
import { EventService } from "../../services/event.service"

export const eventResolver: ResolveFn<EventOverviewModel> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const eventService = inject(EventService)
    const eventSlug = route.paramMap.get('eventSlug')!
    return eventService.findEventOverview(eventSlug)
}