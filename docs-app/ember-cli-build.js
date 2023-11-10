'use strict';

const { Webpack } = require('@embroider/webpack');
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

  const options = {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    snippetExtensions: ['css', 'hbs', 'js', 'json', 'ts', 'yaml'],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticComponents: true,
    staticHelpers: true,
    staticModifiers: true,
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
