import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, HttpInterceptorFn, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { myhttpHandelReqInterceptor } from './interceptors/myhttp-handel-req.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules), withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withInterceptors([myhttpHandelReqInterceptor, loadingInterceptor])),
    provideNoopAnimations(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom([BrowserAnimationsModule])
  ],
};
