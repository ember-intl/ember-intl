/* globals requirejs, Intl */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import ENV from '../config/environment';

const { warn } = Ember;

function filterBy(type) {
  return Object.keys(requirejs._eak_seen).filter((key) => {
    return key.indexOf(`${ENV.modulePrefix}\/${type}\/`) === 0;
  });
}

/**
 * Responsible for loading the CLDR pluralization functions
 */
export function instanceInitializer(instance) {
  let service;

  if (typeof instance.lookup === 'function') {
    service = instance.lookup('service:intl');
  } else {
    service = instance.container.lookup('service:intl');
  }

  const cldrs = filterBy('cldrs');

  if (!cldrs.length) {
    warn(`[ember-intl] project is missing CLDR data\nIf you are asynchronously loading translation, see: https:///github.com/jasonmit/ember-intl/wiki/Asynchronously-loading-translations#asynchronous-loading-of-translations`, false, {
      id: 'ember-intl-missing-cldr-data'
    });
  } else {
    cldrs.map((moduleName) => requirejs(moduleName, null, null, true)['default'])
      .forEach((locale) => locale.forEach(service.addLocaleData));
  }
}

export default {
  name: 'ember-intl-locale-data',
  initialize: instanceInitializer
}
