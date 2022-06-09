/* eslint-env node */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['ember', '@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
  rules: {
    'ember/avoid-leaking-state-in-ember-objects': 'off',
    'ember/no-get': 'off', // @TODO remove support for old Ember
    'ember/no-classic-classes': 'off',
  },
  overrides: [
    // node files
    {
      files: [
        'index.js',
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
        'tests-node/**/*.js',
        'lib/**/*.js',
      ],
      excludedFiles: ['app/**', 'addon-test-support/**', 'addon/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015,
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      }),
    },

    // node tests
    {
      files: ['tests-node/**/*.{js,ts}'],
      env: {
        mocha: true,
      },
    },

    // all TypeScript files
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },

    // test files
    {
      files: ['tests/**/*.{js,ts}'],
      excludedFiles: ['tests/dummy/**/*.{js,ts}'],
      env: {
        embertest: true,
      },
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@@typescript-eslint/ban-ts-comment': 'off',
      },
    },

    // dummy app
    {
      files: ['tests/dummy/**/*.{js,ts}'],
      env: {
        embertest: true,
      },
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
};
