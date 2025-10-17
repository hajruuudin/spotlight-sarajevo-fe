import { Routes } from '@angular/router';
import { Auth } from './interfaces/auth/auth';
import { Login } from './pages/auth-pages/login/login';
import { Signup } from './pages/auth-pages/signup/signup';
import { User } from './interfaces/user/user';
import { Homepage } from './pages/user-pages/homepage/homepage';
import { SpotSearch } from './pages/user-pages/spot-search/spot-search';
import { SpotOverview } from './pages/user-pages/spot-overview/spot-overview';
import { EventSearch } from './pages/user-pages/event-search/event-search';
import { EventOverview } from './pages/user-pages/event-overview/event-overview';
import { Discover } from './pages/user-pages/discover/discover';
import { Profile } from './pages/user-pages/profile/profile';
import { TouristGuide } from './pages/user-pages/tourist-guide/tourist-guide';
import { TouristGuideOverview } from './pages/user-pages/tourist-guide-overview/tourist-guide-overview';
import { Transport } from './pages/user-pages/transport/transport';
import { Collections } from './pages/user-pages/collections/collections';
import { Admin } from './interfaces/admin/admin';
import { AdminSpotOverview } from './pages/admin-pages/admin-spot-overview/admin-spot-overview';
import { AdminEventOverview } from './pages/admin-pages/admin-event-overview/admin-event-overview';
import { AdminGuideOverview } from './pages/admin-pages/admin-guide-overview/admin-guide-overview';
import { AdminRequestOverview } from './pages/admin-pages/admin-request-overview/admin-request-overview';
import { AdminUserOverview } from './pages/admin-pages/admin-user-overview/admin-user-overview';
import { AdminTransportOverview } from './pages/admin-pages/admin-transport-overview/admin-transport-overview';
import { AdminAddSpots } from './pages/admin-pages/admin-add-spots/admin-add-spots';
import { AdminAddEvents } from './pages/admin-pages/admin-add-events/admin-add-events';
import { AdminAddGuides } from './pages/admin-pages/admin-add-guides/admin-add-guides';
import { NotFound } from './interfaces/not-found/not-found';

export const routes: Routes = [
    {
        path: 'auth',
        component: Auth,
        children: [
            { path: 'login', component: Login, title: 'Login - SpotlightSarajevo' },
            { path: 'register', component: Signup, title: 'Login - SpotlightSarajevo' },
        ]
    },
    {
        path: '',
        component: User,
        children: [
            { path: 'homepage', component: Homepage, title: 'Homepage - SpotlightSarajevo' },

            { path: 'spots', component: SpotSearch, title: 'Browse Spots - SpotlightSarajevo' },
            { path: 'spots/:slug', component: SpotOverview, title: 'Spot Overview - SpotlightSarajevo' },

            { path: 'events', component: EventSearch, title: 'Browse Events - SpotlightSarajevo' },
            { path: 'events/:slug', component: EventOverview, title: 'Event - SpotlightSarajevo' },

            { path: 'discover', component: Discover, title: 'Discover - SpotlightSarajevo' },
            { path: 'profile', component: Profile, title: 'Profile - SpotlightSarajevo' },

            { path: 'guide', component: TouristGuide, title: 'Browse Guides - SpotlightSarajevo' },
            { path: 'guide/slug', component: TouristGuideOverview, title: 'Guide Overview - SpotlightSarajevo' },

            { path: 'transport', component: Transport, title: 'Public Transport - SpotlightSarajevo' },

            { path: 'collections', component: Collections, title: 'Your Collections - SpotlightSarajevo' }
        ]
    },
    {
        path: 'admin',
        component: Admin,
        children: [
            { path: 'spots-overview', component: AdminSpotOverview, title: "Admin - Spots Overview" },
            { path: 'events-overview', component: AdminEventOverview, title: "Admin - Events Overview" },
            { path: 'guide-overview', component: AdminGuideOverview, title: "Admin - Guides Overview" },
            { path: 'user-overview', component: AdminUserOverview, title: "Admin - User Overview" },
            { path: 'transport-overview', component: AdminTransportOverview, title: "Admin - Transport Overview" },

            { path: 'requests-overview', component: AdminRequestOverview, title: "Admin - Requests Overview" },

            { path: 'add-spot', component: AdminAddSpots, title: "Admin - Add Spot" },
            { path: 'add-event', component: AdminAddEvents, title: "Admin - Add Event" },
            { path: 'add-guide', component: AdminAddGuides, title: "Admin - Add Guide" },
        ]
    },
    {
        path: '**',
        component: NotFound,
        title: 'Not found :('
    }
];
