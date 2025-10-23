'use strict';

const sideWatch = require('@embroider/broccoli-side-watch');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
    },

    trees: {
      app: sideWatch('app', {
        watching: ['../../packages/ember-intl/src', '../my-v2-addon/src'],
      }),
    },
  });

  return app.toTree();
};
