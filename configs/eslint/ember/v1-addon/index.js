import babelEslintParser from '@babel/eslint-parser';
import eslint from '@eslint/js';
// eslint-disable-next-line import/no-unresolved
import eslintPluginEmber from 'eslint-plugin-ember/recommended';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginQunit from 'eslint-plugin-qunit';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';

const parserOptionsJs = {
  babelOptions: {
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          decoratorsBeforeExport: true,
        },
      ],
    ],
  },
  ecmaFeatures: {
    modules: true,
  },
  ecmaVersion: 'latest',
  requireConfigFile: false,
};

const parserOptionsTs = {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
};

export default tseslint.config(
  {
    ignores: ['blueprints/', 'dist/', 'node_modules/', '!.*', '.*/'],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      curly: 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  eslint.configs.recommended,
  eslintPluginEmber.configs.base,
  eslintPluginEmber.configs.gjs,
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginPrettier,

  // Ember files
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelEslintParser,
    },
  },
  {
    files: ['**/*.{gjs,js}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: parserOptionsJs,
    },
    rules: {
      'import/no-duplicates': 'error',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^@ember', '^dummy', '^ember', 'fetch'],
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.gjs', '.gts', '.js', '.ts'],
        },
      },
    },
  },
  {
    extends: [
      ...tseslint.configs.recommended,
      eslintPluginEmber.configs.gts,
      eslintPluginImport.flatConfigs.typescript,
    ],
    files: ['**/*.{gts,ts}'],
    languageOptions: {
      parser: eslintPluginEmber.parser,
      parserOptions: parserOptionsTs,
    },
    plugins: {
      'typescript-sort-keys': eslintPluginTypescriptSortKeys,
    },
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
      'import/no-duplicates': 'error',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^@ember', '^dummy', '^ember', 'fetch'],
        },
      ],
      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.gjs', '.gts', '.js', '.ts'],
        },
        typescript: true,
      },
    },
  },
  {
    files: ['app/**/*.js'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },

  // Test files
  {
    files: ['tests/**/*-test.{gjs,gts,js,ts}'],
    plugins: {
      qunit: eslintPluginQunit,
    },
  },

  // Configuration files
  {
    files: [
      '**/*.cjs',
      'config/**/*.js',
      'lib/**/*.js',
      'tests/dummy/config/**/*.js',
      '.prettierrc.js',
      '.stylelintrc.js',
      '.template-lintrc.js',
      'ember-cli-build.js',
      'index.js',
      'testem.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      sourceType: 'script',
    },
    plugins: {
      n: eslintPluginN,
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: parserOptionsJs,
      sourceType: 'module',
    },
    plugins: {
      n: eslintPluginN,
    },
  },
);
