'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { formats } = require('./config/ember-intl-config');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    '@embroider/macros': {
      setConfig: {
        'ember-intl': {
          formats,
        },
      },
    },

    autoImport: {
      watchDependencies: ['ember-intl'],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    // Add options here
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app);
};
