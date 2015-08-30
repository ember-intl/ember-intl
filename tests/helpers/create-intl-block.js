/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { run:emberRun } = Ember;

function createIntlBlock () {
  return function(template, locale) {
    const service = this.container.lookup('service:intl');

    if (locale) {
      emberRun(() => {
        service.setLocale(locale);
      });
    }

    // suppress deprecation warnings
    if (Ember && Ember.ENV) {
      Ember.ENV._ENABLE_LEGACY_VIEW_SUPPORT = true;
    }

    return Ember.View.create({
      template: template,
      container: this.container
    });
  };
}

export default createIntlBlock;
