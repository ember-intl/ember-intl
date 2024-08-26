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
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.gjs', '.gts', '.js', '.ts'],
      },
      typescript: true,
    },
  },
  overrides: [
    // Ember files
    {
      files: ['**/*.{gts,ts}'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-empty-object-type': [
          'error',
          {
            allowInterfaces: 'always',
            allowObjectTypes: 'always',
          },
        ],
        '@typescript-eslint/no-import-type-side-effects': 'error',
      },
    },
    {
      files: ['**/*.gjs'],
      parser: 'ember-eslint-parser',
      extends: ['plugin:ember/recommended-gjs'],
    },
    {
      files: ['**/*.gts'],
      parser: 'ember-eslint-parser',
      extends: ['plugin:ember/recommended-gts'],
    },
    {
      files: ['**/*.{gjs,gts,js,ts}'],
      rules: {
        'import/no-duplicates': 'error',
        'import/no-unresolved': [
          'error',
          { ignore: ['^@ember', '^dummy/', '^ember', 'fetch'] },
        ],
      },
    },
    {
      files: ['src/**/*.{gjs,gts,js,ts}'],
      rules: {
        'import/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
          },
        ],
      },
    },
    // Node files
    {
      files: [
        './.eslintrc.{cjs,js}',
        './.prettierrc.{cjs,js}',
        './.stylelintrc.{cjs,js}',
        './.template-lintrc.{cjs,js}',
        './addon-main.cjs',
        './blueprints/*/index.js',
        './rollup.config.mjs',
      ],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
  ],
};
