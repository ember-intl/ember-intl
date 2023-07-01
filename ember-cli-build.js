'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = function (defaults) {
  const { project } = defaults;

  const options = {
    autoImport: {
      webpack: {
        node: {
          global: true,
        },
      },
    },

    'ember-fetch': {
      preferNative: true,
    },

    // Code snippets for ember-cli-addon-docs
    snippetExtensions: ['css', 'hbs', 'js', 'json', 'ts', 'yaml'],

    vendorFiles: {
      'app-shims.js': null,
    },
  };

  if (project.findAddonByName('ember-native-dom-event-dispatcher')) {
    options.vendorFiles['jquery.js'] = null;
  }

  const app = new EmberAddon(defaults, options);

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
