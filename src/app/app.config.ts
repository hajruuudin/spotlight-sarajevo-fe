import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './controller/services/auth-interceptor.service';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BlockUIModule, BlockUIService } from 'ng-block-ui';
import { NgxSpinnerModule } from 'ngx-spinner'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      (req, next: HttpHandlerFn) => inject(AuthInterceptor).intercept(req, {
        handle: (internalReq) => next(internalReq)
      })
    ])),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: GoogleOAuthProvider, useValue: "564056268905-9j2u47hutljdrv2rgepipilpgp2ogh3e.apps.googleusercontent.com"},
    importProvidersFrom(NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'})),
    provideAnimationsAsync(),
  ]
};
