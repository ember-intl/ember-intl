/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import ENV from '../config/environment';

function filterBy(env, type) {
  return Object.keys(requirejs._eak_seen).filter((key) => {
    return key.indexOf(`${env.modulePrefix}\/${type}\/`) === 0;
  });
}

export function instanceInitializer(instance) {
  const container = instance.lookup ? instance : instance.container;
  const service = container.lookup('service:intl');

  filterBy(ENV, 'cldrs').forEach((key) => {
    service.addLocaleData(require(key, null, null, true)['default']);
  });

  filterBy(ENV, 'translations').forEach((key) => {
    const localeSplit = key.split('\/');
    const localeName = localeSplit[localeSplit.length - 1];
    service.addTranslations(localeName, require(key, null, null, true)['default']);
  });
}

export default {
  name: 'ember-intl',
  initialize: instanceInitializer
}
