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
            'ember-page-title': '8.2.3',
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
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
          },
        },
      },
      {
        name: 'ember-test-helpers-v3',
        npm: {
          devDependencies: {
            '@ember/test-helpers': '^3.3.1',
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
