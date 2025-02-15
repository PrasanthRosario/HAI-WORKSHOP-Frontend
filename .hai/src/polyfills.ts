/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes recent versions of Safari, Chrome (including
 * Opera), Edge on the desktop, and iOS and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 * This section contains polyfills that ensure consistent behavior across different browsers
 */

/**
 * Zone.js Configuration Options
 * 
 * Zone.js patches various browser APIs to enable Angular's change detection and other features.
 * Users can disable specific patches by setting flags before loading zone.js.
 * 
 * To customize zone.js behavior:
 * 1. Create a zone-flags.ts file
 * 2. Set desired flags in that file
 * 3. Import zone-flags.ts before importing zone.js
 *
 * Common configuration flags:
 * __Zone_disable_requestAnimationFrame: Disables patching of requestAnimationFrame
 * __Zone_disable_on_property: Disables patching of DOM event properties
 * __zone_symbol__UNPATCHED_EVENTS: Array of event names to exclude from patching
 * __Zone_enable_cross_context_check: Special flag for IE/Edge compatibility
 */

/***************************************************************************************************
 * Zone JS Import
 * Required by Angular for change detection and async operation handling
 */
import 'zone.js';  // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 * Add any additional polyfills or imports needed by your application here
 */