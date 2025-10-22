'use strict';

const { maybeEmbroider } = require('@embroider/test-setup');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['ember-intl'],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  return maybeEmbroider(app);
};
