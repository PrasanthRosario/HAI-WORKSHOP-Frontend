// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// Import the zone.js testing utilities required for Angular testing
import 'zone.js/testing';

// Import TestBed from Angular core testing module
import { getTestBed } from '@angular/core/testing';

// Import necessary modules for browser dynamic testing
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
 * Type declaration for webpack's require.context
 * This allows TypeScript to understand the context module API
 * @param path - Base directory to search
 * @param deep - Whether to search subdirectories
 * @param filter - RegExp to match files against
 */
declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// Initialize the Angular testing environment
// This sets up the platform for running tests
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Create a test context that includes all files ending with .spec.ts
// The context will search from the current directory ('./') recursively (true)
const context = require.context('./', true, /\.spec\.ts$/);

// Load all modules that match the context
// This will execute all test files found by the context
context.keys().forEach(context);