'use strict';

const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  const { default: latestVersion } = await import('latest-version');

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
            'ember-resolver': '11.0.1',
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
        name: 'ember-lts-5.8',
        npm: {
          devDependencies: {
            'ember-source': '~5.8.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await latestVersion('ember-source'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await latestVersion('ember-source', {
              version: 'beta',
            }),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await latestVersion('ember-source', {
              version: 'alpha',
            }),
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
