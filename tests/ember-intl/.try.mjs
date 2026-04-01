export default {
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
      name: 'ember-lts-6.8',
      npm: {
        devDependencies: {
          'ember-source': '~6.8.0',
        },
      },
    },
    {
      name: 'ember-release',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@latest',
        },
      },
    },
    // {
    //   name: 'ember-beta',
    //   npm: {
    //     devDependencies: {
    //       'ember-source': 'npm:ember-source@beta',
    //     },
    //   },
    // },
    // {
    //   name: 'ember-canary',
    //   npm: {
    //     devDependencies: {
    //       'ember-source': 'npm:ember-source@alpha',
    //     },
    //   },
    // },
  ],
};
