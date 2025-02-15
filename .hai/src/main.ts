/**
 * Main entry point of the Angular application
 * This file is responsible for bootstrapping the application and setting up production mode if needed
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Check if the application is running in production mode
if (environment.production) {
  // Enable production mode which disables development-specific checks and warnings
  enableProdMode();
}

// Bootstrap the application with the root AppModule
// platformBrowserDynamic() creates an instance of the platform that runs in the browser
platformBrowserDynamic().bootstrapModule(AppModule)
  // Handle any errors that occur during bootstrapping
  .catch(err => console.error(err));