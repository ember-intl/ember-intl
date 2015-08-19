module.exports = {
  scenarios: [
    {
      name: 'ember-1.10.0',
      dependencies: {
        'ember': '1.10.0',
        'ember-load-initializers': 'ember-cli/ember-load-initializers#0.0.2',
        'ember-cli-shims': 'stefanpenner/ember-cli-shims#0.0.3'
      }
    },
    {
      name: 'ember-1.11.0',
      dependencies: {
        'ember': '1.11.0',
        'ember-load-initializers': 'ember-cli/ember-load-initializers#0.0.2',
        'ember-cli-shims': 'stefanpenner/ember-cli-shims#0.0.3'
      }
    },
    {
      name: 'ember-1.12.0',
      dependencies: {
        'ember': '1.12.0',
        'ember-cli-shims': 'stefanpenner/ember-cli-shims#0.0.3'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
