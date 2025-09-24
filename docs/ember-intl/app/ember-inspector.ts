/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import { RSVP } from '@ember/-internals/runtime';
// @ts-expect-error: Cannot find module '@glimmer/reference' or its corresponding type declarations.
import * as glimmerReference from '@glimmer/reference';
// @ts-expect-error: Cannot find module '@glimmer/runtime' or its corresponding type declarations.
import * as glimmerRuntime from '@glimmer/runtime';
import * as glimmerTracking from '@glimmer/tracking';
// @ts-expect-error: Cannot find module '@glimmer/validator' or its corresponding type declarations.
import * as glimmerValidator from '@glimmer/validator';
import Ember from 'ember';

import config from './config/environment';

// @ts-expect-error: Property 'define' does not exist on type 'Window & typeof globalThis'
window.define('@glimmer/reference', () => glimmerReference);
// @ts-expect-error: Property 'define' does not exist on type 'Window & typeof globalThis'
window.define('@glimmer/runtime', () => glimmerRuntime);
// @ts-expect-error: Property 'define' does not exist on type 'Window & typeof globalThis'
window.define('@glimmer/tracking', () => glimmerTracking);
// @ts-expect-error: Property 'define' does not exist on type 'Window & typeof globalThis'
window.define('@glimmer/validator', () => glimmerValidator);
// @ts-expect-error: Property 'define' does not exist on type 'Window & typeof globalThis'
window.define('ember', () => ({ default: Ember }));
// @ts-expect-error: Property 'define' does not exist on type 'Window & typeof globalThis'
window.define('rsvp', () => RSVP);

// @ts-expect-error: Property 'define' does not exist on type 'Window & typeof globalThis'
window.define('frontend-geoinsight/config/environment', () => ({
  default: config,
}));
