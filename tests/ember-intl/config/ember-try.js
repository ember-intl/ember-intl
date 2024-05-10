'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            '@ember/test-helpers': '2.9.4',
            '@types/ember__test-helpers': '2.9.1',
            '@types/ember-qunit': '6.1.1',
            'ember-cli': '~3.28.0',
            'ember-qunit': '6.0.0',
            'ember-source': '~3.28.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            // 'ember-source': await getChannelURL('beta'),
            'ember-source': '5.9.0-beta.1',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            // 'ember-source': await getChannelURL('canary'),
            'ember-source': '5.10.0-alpha.1',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
