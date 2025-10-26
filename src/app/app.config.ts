import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
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
  ]
};
