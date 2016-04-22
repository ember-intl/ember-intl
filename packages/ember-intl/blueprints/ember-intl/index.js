'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

module.exports = {
  description: 'Setup ember-intl',

  normalizeEntityName: function () {},

  afterInstall: function() {
    this.ui.writeLine(
      '[ember-intl] Don\'t forget to setup your application-wide locale.  ' +
      'Documentation: https://github.com/jasonmit/ember-intl#setting-runtime-locale'
    );
  }
};
