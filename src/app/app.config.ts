import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { UserAuthModule } from './user-auth/user-auth.module';
import { AuthInterceptor } from './user-auth/interceptors/interceptor';  // Correct import



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(UserAuthModule),
    provideHttpClient(),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Register the interceptor
      multi: true
    }
  ]
};
