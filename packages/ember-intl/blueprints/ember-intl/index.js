'use strict';

const { join } = require('node:path');

module.exports = {
  description: 'Setup ember-intl',

  normalizeEntityName() {},

  fileMapTokens() {
    return {
      __app__(options) {
        if (options.inAddon) {
          return join('tests', 'dummy', 'app');
        }

        return 'app';
      },
      __config__(options) {
        if (options.inAddon) {
          return join('tests', 'dummy', 'config');
        }

        return 'config';
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
