'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
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
