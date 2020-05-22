// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
/**
 * require const variable
 */
declare const require: any;
/**
 * function testing
 */
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
/**
 * context variable
 */
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
/**
 * map
 */
context.keys().map(context);
