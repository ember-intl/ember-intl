/*
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { deprecate } from '@ember/application/deprecations';

export function instanceInitializer() {
  deprecate('[ember-intl] instance initializer is deprecated, no longer necessary to call in testing.', false, {
    id: 'ember-intl-instance-initalizer',
    until: '3.0.0'
  });
}

export default {
  name: 'ember-intl',
  initialize(instance) {
    /*
     * instantiate as early since hydration is async
     * occurring too late could trigger a double-render if you did not instantiate
     * up until rendering.  This is typically never the case, as you setup the locale
     * when the app is initializing (route or initializer).  this is kept primary
     * for ember-addons that do have an app-wide locale.
     */
    instance.lookup('service:intl');
  }
};
