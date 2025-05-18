import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BlockUIModule } from 'ng-block-ui';
import { NgxSpinnerModule } from 'ngx-spinner'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHotToastConfig } from '@ngxpert/hot-toast';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, inMemoryScrollingFeature),
    provideHttpClient(withInterceptors([
      (req, next: HttpHandlerFn) => inject(AuthInterceptor).intercept(req, {
        handle: (internalReq) => next(internalReq)
      })
    ])),
    {provide: GoogleOAuthProvider, useValue: "564056268905-9j2u47hutljdrv2rgepipilpgp2ogh3e.apps.googleusercontent.com"},
    importProvidersFrom(NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'})),
    provideAnimationsAsync(),
    provideAnimations(),
    provideHotToastConfig({
      stacking: "depth",
      position: "top-right"
    }),
    importProvidersFrom(BlockUIModule.forRoot())
  ]
};
