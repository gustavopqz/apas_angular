import { ApplicationConfig } from '@angular/core';
import { provideRouter, } from '@angular/router';

import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), { provide: LocationStrategy, useClass: HashLocationStrategy }]
};
