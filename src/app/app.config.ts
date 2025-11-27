import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode, importProvidersFrom, APP_INITIALIZER, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { HttpHandler, HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { SessionService } from './core/services/session.service';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const session = inject(SessionService)
      return session.restoreSession()
    }),
    provideHttpClient(withInterceptors([
      (req, next: HttpHandlerFn) => inject(AuthInterceptor).intercept(req, {
        handle: (internalReq) => next(internalReq)
      })
    ])),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
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
