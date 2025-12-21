import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode, importProvidersFrom, APP_INITIALIZER, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([
      (req, next: HttpHandlerFn) => inject(AuthInterceptor).intercept(req, {
        handle: (internalReq) => next(internalReq)
      })
    ])),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ), 
    provideHotToastConfig({
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#032d30',
        border: '1px solid #1ae9f5',
        color: '#fff',
        borderRadius: '12px',
        padding: '6px 16px',
        fontSize: '16px',
        fontWeight: '500',
        textAlign: 'start',
        alignItems: 'center'
      },
      stacking: 'depth'
    }), 
    provideHttpClient(), 
    provideTransloco({
        config: { 
          availableLangs: ['en', 'ba'],
          defaultLang: 'en',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
    }),
    provideCharts(withDefaultRegisterables())
  ]
};
