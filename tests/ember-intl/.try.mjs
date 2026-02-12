const dependenciesForCompatibility = {
  // '@ember/optional-features': '^2.3.0',
  // '@embroider/compat': '^4.1.13',
  // 'ember-cli': '~6.10.0',
  // 'ember-auto-import': '^2.12.0',
};

const filesForCompatibility = {
  // 'config/optional-features.json': [
  //   `{`,
  //   `  "application-template-wrapper": false,`,
  //   `  "default-async-observers": true,`,
  //   `  "jquery-integration": false,`,
  //   `  "no-implicit-route-model": true,`,
  //   `  "template-only-glimmer-components": true`,
  //   `}`,
  // ].join('\n'),
  // 'ember-cli-build.js': [
  //   `const { compatBuild } = require('@embroider/compat');`,
  //   `const EmberApp = require('ember-cli/lib/broccoli/ember-app');`,
  //   ``,
  //   `module.exports = async function (defaults) {`,
  //   `  const { buildOnce } = await import('@embroider/vite');`,
  //   ``,
  //   `  const app = new EmberApp(defaults, {`,
  //   `    'ember-cli-babel': {`,
  //   `      enableTypeScriptTransform: true,`,
  //   `    },`,
  //   `  });`,
  //   ``,
  //   `  return compatBuild(app, buildOnce);`,
  //   `};`,
  // ].join('\n'),
};

export default {
  packageManager: 'pnpm',
  scenarios: [
    {
      env: {
        ENABLE_COMPAT_BUILD: true,
      },
      files: filesForCompatibility,
      name: 'ember-lts-4.12',
      npm: {
        devDependencies: {
          ...dependenciesForCompatibility,
          'ember-source': '~4.12.0',
        },
      },
    },
    {
      env: {
        ENABLE_COMPAT_BUILD: true,
      },
      files: filesForCompatibility,
      name: 'ember-lts-5.12',
      npm: {
        devDependencies: {
          ...dependenciesForCompatibility,
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
    {
      name: 'ember-beta',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@beta',
        },
      },
    },
    {
      name: 'ember-canary',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@alpha',
        },
      },
    },
  ],
};
