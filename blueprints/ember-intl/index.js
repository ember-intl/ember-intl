'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
let path = require('path');

module.exports = {
  description: 'Setup ember-intl',

  normalizeEntityName() {},

  fileMapTokens() {
    return {
      __app__(options) {
        if (options.inAddon) {
          return path.join('tests', 'dummy', 'app');
        } else {
          return path.join('app');
        }
      },
      __config__(options) {
        if (options.inAddon) {
          return path.join('tests', 'dummy', 'config');
        } else {
          return path.join('config');
        }
      },
    };
  },

  afterInstall() {
    this.ui.writeLine(
      "[ember-intl] Don't forget to configure your application.  " +
        'Documentation: https://ember-intl.github.io/ember-intl/versions/master/docs/quickstart#4-configure-ember-intl',
    );
  },
};
