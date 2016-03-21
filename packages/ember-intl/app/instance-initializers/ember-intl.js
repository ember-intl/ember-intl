/* globals requirejs */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import ENV from '../config/environment';

function filterBy(type) {
  return Object.keys(requirejs._eak_seen).filter((key) => {
    return key.indexOf(`${ENV.modulePrefix}\/${type}\/`) === 0;
  });
}

export function instanceInitializer(instance) {
  let service;

  if (typeof instance.lookup === 'function') {
    service = instance.lookup('service:intl');
  } else {
    service = instance.container.lookup('service:intl');
  }

  filterBy('cldrs').forEach((key) => {
    service.addLocaleData(require(key, null, null, true)['default']);
  });

  filterBy('translations').forEach((key) => {
    const localeSplit = key.split('\/');
    const localeName = localeSplit[localeSplit.length - 1];
    service.addTranslations(localeName, require(key, null, null, true)['default']);
  });
}

export default {
  name: 'ember-intl',
  initialize: instanceInitializer
}
