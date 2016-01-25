/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

const { run:emberRun, setOwner } = Ember;

function createRenderer() {
  // suppress deprecation warnings
  if (Ember && Ember.ENV) {
    Ember.ENV._ENABLE_LEGACY_VIEW_SUPPORT = true;
  }

  const { registry, container } = this;
  registry.register('view:-blank', Ember.View.extend());

  return function(template, locale) {
    const owner = getOwner(this);
    const service = owner.lookup('service:intl');

    if (locale) {
      emberRun(() => {
        service.setLocale(locale);
      });
    }

    const createOptions = {
      template: template
    };

    if (setOwner) {
      setOwner(createOptions, owner);
    } else {
      createOptions.container = container;
    }

    return owner._lookupFactory('view:-blank').create(createOptions);
  };
}

export default createRenderer;
