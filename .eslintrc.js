'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'ember',
    '@typescript-eslint',
    'simple-import-sort',
    'typescript-sort-keys',
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    curly: 'error',
    'ember/no-get': 'off', // TODO: Remove support for old Ember
    'ember/no-classic-classes': 'off', // TODO: Remove support for old Ember
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  settings: {
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  overrides: [
    // TypeScript files
    {
      files: ['**/*.{gts,ts}'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'n/no-missing-import': 'off',
      },
    },
    // TypeScript and JavaScript files
    {
      files: ['**/*.{gjs,gts,js,ts}'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            ignoreRestSiblings: true,
          },
        ],
        'import/no-duplicates': 'error',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': [
          'error',
          { ignore: ['^@ember', '^dummy/', '^ember', 'fetch'] },
        ],
      },
    },
    // Node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './index.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/**/*.js',
        './tests/dummy/config/**/*.js',
        './tests-node/**/*.js',
      ],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    // Test files
    {
      files: ['tests/**/*-test.{gjs,gts,js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
    {
      files: ['tests-node/**/*.{js,ts}'],
      env: {
        mocha: true,
      },
    },
  ],
};
