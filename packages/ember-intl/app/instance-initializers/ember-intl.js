/* globals requirejs, Intl */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import ENV from '../config/environment';
import links from 'ember-intl/utils/links';

const { warn } = Ember;

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

  if (typeof Intl === 'undefined') {
    warn(`[ember-intl] Intl API is unavailable in this environment.\nSee: ${links.polyfill}`, false, {
      id: 'ember-intl-undefined-intljs'
    });
  }

  const cldrs = filterBy('cldrs');

  if (!cldrs.length) {
    warn('[ember-intl] project is missing CLDR data\nIf you are asynchronously loading translation, see: ${links.asyncTranslations}.', false, {
      id: 'ember-intl-missing-cldr-data'
    });
  } else {
    cldrs.map((moduleName) => requirejs(moduleName, null, null, true)['default'])
      .forEach((locale) => locale.forEach(service.addLocaleData));
  }

  filterBy('translations').forEach((moduleName) => {
    const localeSplit = moduleName.split('\/');
    const localeName = localeSplit[localeSplit.length - 1];
    service.addTranslations(localeName, requirejs(moduleName, null, null, true)['default']);
  });
}

export default {
  name: 'ember-intl',
  initialize: instanceInitializer
}
