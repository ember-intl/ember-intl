'use strict';

const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  const { default: latestVersion } = await import('latest-version');

  return {
    packageManager: 'pnpm',
    scenarios: [
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
