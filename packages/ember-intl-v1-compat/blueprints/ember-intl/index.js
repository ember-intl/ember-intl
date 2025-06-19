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

  locals(options) {
    const configInputPath = options.inAddon
      ? 'tests/dummy/translations'
      : 'translations';

    return {
      configInputPath,
    };
  },

  afterInstall() {
    this.ui.writeLine(
      [
        "[ember-intl] Don't forget to configure your project.",
        'See https://ember-intl.github.io/ember-intl/docs/quickstart#4-configure-project',
      ].join(' '),
    );
  },
};
