import { Routes } from '@angular/router';
import { Auth } from './interfaces/auth/auth';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { User } from './interfaces/home/user';
import { Homepage } from './pages/home/homepage/homepage';
import { SpotSearch } from './pages/home/spot-search/spot-search';
import { SpotOverview } from './pages/home/spot-overview/spot-overview';
import { EventSearch } from './pages/home/event-search/event-search';
import { EventOverview } from './pages/home/event-overview/event-overview';
import { Discover } from './pages/home/discover/discover';
import { Profile } from './pages/home/profile/profile';
import { TouristGuide } from './pages/home/tourist-guide/tourist-guide';
import { TouristGuideOverview } from './pages/home/tourist-guide-overview/tourist-guide-overview';
import { Transport } from './pages/home/transport/transport';
import { Collections } from './pages/home/collections/collections';
import { Admin } from './interfaces/admin/admin';
import { AdminSpotOverview } from './pages/admin/admin-spot-overview/admin-spot-overview';
import { AdminEventOverview } from './pages/admin/admin-event-overview/admin-event-overview';
import { AdminGuideOverview } from './pages/admin/admin-guide-overview/admin-guide-overview';
import { AdminRequestOverview } from './pages/admin/admin-request-overview/admin-request-overview';
import { AdminUserOverview } from './pages/admin/admin-user-overview/admin-user-overview';
import { AdminTransportOverview } from './pages/admin/admin-transport-overview/admin-transport-overview';
import { AdminAddSpots } from './pages/admin/admin-add-spots/admin-add-spots';
import { AdminAddEvents } from './pages/admin/admin-add-events/admin-add-events';
import { AdminAddGuides } from './pages/admin/admin-add-guides/admin-add-guides';
import { NotFound } from './interfaces/error/not-found';
import { CommunityRequests } from './pages/home/community-requests/community-requests';
import { spotResolver } from './core/resolvers/spot.resolver';
import { eventResolver } from './core/resolvers/event.resolver';
import { collectionsResolver } from './core/resolvers/collection.resolver';
import { AuthBenefits } from './pages/home/auth-benefits/auth-benefits';
import { authGuard } from './core/guards/auth.guard';
import {discoverResolver} from './core/resolvers/discover.resolver';
import { homepageResolver } from './core/resolvers/homepage.resolver';

export const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
    children: [
      { path: 'login', component: Login, title: 'Login - SpotlightSarajevo' },
      { path: 'register', component: Signup, title: 'Login - SpotlightSarajevo' },
    ],
  },
  {
    path: '',
    component: User,
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', resolve: {homepageData: homepageResolver}, component: Homepage, title: 'Homepage - SpotlightSarajevo' },

      { path: 'spots', component: SpotSearch, title: 'Browse Spots - SpotlightSarajevo' },
      {
        path: 'spots/:spotSlug',
        resolve: [spotResolver],
        component: SpotOverview,
        title: 'Spot Overview - SpotlightSarajevo',
      },

      { path: 'events', component: EventSearch, title: 'Browse Events - SpotlightSarajevo' },
      {
        path: 'events/:eventSlug',
        resolve: {eventData: eventResolver},
        component: EventOverview,
        title: 'Event - SpotlightSarajevo',
      },

      { path: 'discover', resolve: { discoverData: discoverResolver }, component: Discover, title: 'Discover - SpotlightSarajevo' },
      { path: 'profile', component: Profile, title: 'Profile - SpotlightSarajevo' },
      { path: 'guide', component: TouristGuide, title: 'Browse Guides - SpotlightSarajevo' },
      {
        path: 'guide/slug',
        component: TouristGuideOverview,
        title: 'Guide Overview - SpotlightSarajevo',
      },
      { path: 'transport', component: Transport, title: 'Public Transport - SpotlightSarajevo' },
      {
        path: 'collections',
        canMatch: [authGuard],
        resolve: { collectionData: collectionsResolver },
        component: Collections,
        title: 'Your Collections - SpotlightSarajevo',
      },
      {
        path: 'requests',
        component: CommunityRequests,
        title: 'Community Requests - SpotlightSarajevo',
      },
      {
        path: 'auth-benefits',
        component: AuthBenefits,
        title: 'Login for more! Extra Functions'
      }
    ],
  },
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: 'spots-overview', component: AdminSpotOverview, title: 'Admin - Spots Overview' },
      { path: 'events-overview', component: AdminEventOverview, title: 'Admin - Events Overview' },
      { path: 'guide-overview', component: AdminGuideOverview, title: 'Admin - Guides Overview' },
      { path: 'user-overview', component: AdminUserOverview, title: 'Admin - User Overview' },
      {
        path: 'transport-overview',
        component: AdminTransportOverview,
        title: 'Admin - Transport Overview',
      },
      {
        path: 'requests-overview',
        component: AdminRequestOverview,
        title: 'Admin - Requests Overview',
      },

      { path: 'add-spot', component: AdminAddSpots, title: 'Admin - Add Spot' },
      { path: 'add-event', component: AdminAddEvents, title: 'Admin - Add Event' },
      { path: 'add-guide', component: AdminAddGuides, title: 'Admin - Add Guide' },
    ],
  },
  {
    path: '**',
    component: NotFound,
    title: 'Not found :(',
  },
];
