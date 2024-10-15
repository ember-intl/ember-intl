'use strict';

const sideWatch = require('@embroider/broccoli-side-watch');
const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['ember-intl-compat'],
    },

    'ember-cli-addon-docs': {
      documentingAddonAt: '../../packages/ember-intl',
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    // Code snippets for ember-cli-addon-docs
    snippetExtensions: ['css', 'hbs', 'js', 'json', 'ts', 'yaml'],

    trees: {
      app: sideWatch('app', {
        watching: ['../../packages/ember-intl/src'],
      }),
    },
  });

  const options = {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticComponents: true,
    staticHelpers: true,
    staticModifiers: true,
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
