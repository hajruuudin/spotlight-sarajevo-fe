import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

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
        background: '#055b61',
        border: '2px solid #1ae9f5',
        color: '#fff',
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '16px',
        fontWeight: '500'
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
