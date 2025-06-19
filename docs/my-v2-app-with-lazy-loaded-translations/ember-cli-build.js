'use strict';

const { compatBuild } = require('@embroider/compat');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

  const app = new EmberApp(defaults, {});

  return compatBuild(app, buildOnce);
};
