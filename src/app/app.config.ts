import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './controller/services/auth-interceptor.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      (req, next: HttpHandlerFn) => inject(AuthInterceptor).intercept(req, {
        handle: (internalReq) => next(internalReq)
      })
    ])),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
};
