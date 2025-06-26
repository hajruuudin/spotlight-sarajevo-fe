import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SavedComponent } from './sections/saved/saved.component';
import { SpotsComponent } from './sections/spots/spots.component';
import { HomepageComponent } from './sections/homepage/homepage.component';
import { EventsComponent } from './sections/events/events.component';
import { DiscoverComponent } from './sections/discover/discover.component';
import { ProfileComponent } from './sections/profile/profile.component';
import { DataComponent } from './sections/data/data.component';
import { AddSpotComponent } from './sections/add-spot/add-spot.component';
import { AddEventComponent } from './sections/add-event/add-event.component';
import { RequestsComponent } from './sections/requests/requests.component';
import { LoginComponent } from './sections/login/login.component';
import { RegisterComponent } from './sections/register/register.component';
import { SpotOverviewComponent } from './sections/spot-overview/spot-overview.component';
import { EventOverviewComponent } from './sections/event-overview/event-overview.component';
import { CommunityRequestAddComponent } from './sections/community-request-add/community-request-add.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '', redirectTo: 'login', pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    },
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '', redirectTo: 'homepage', pathMatch: 'full'
            },
            {
                path: 'saved',
                component: SavedComponent
            },
            {
                path: 'spots',
                component: SpotsComponent
            },
            {
                path: 'homepage',
                component: HomepageComponent
            },
            {
                path: 'events',
                component: EventsComponent
            },
            {
                path: 'discover',
                component: DiscoverComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'add-community-request',
                component: CommunityRequestAddComponent
            },
            {
                path: 'spot/:spot-slug',
                component: SpotOverviewComponent
            },
            {
                path: 'event/:event-slug',
                component: EventOverviewComponent
            }
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '', redirectTo: 'data', pathMatch: 'full'
            },
            {
                path: 'data',
                component: DataComponent
            },
            {
                path: 'add-spot',
                component: AddSpotComponent
            },
            {
                path: 'add-event',
                component: AddEventComponent
            },
            {
                path: 'requests',
                component: RequestsComponent
            }
        ]
    }
];
