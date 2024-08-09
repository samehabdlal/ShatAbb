import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { interceptorsInterceptor } from './_interceptor/-interceptors.interceptor';
import { jwtInterceptor } from './_interceptor/-jwt.interceptor';
import { loadingInterceptor } from './_interceptor/loading.interceptor';
import { firstValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([interceptorsInterceptor,jwtInterceptor,loadingInterceptor])),
    provideToastr({
      // positionClass:'toast-top-left'
    }), // Toastr providers
    //implmemnt ngrx spinner module show all componinet
    provideAnimations()
  ],
};
