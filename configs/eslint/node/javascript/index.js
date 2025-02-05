import babelEslintParser from '@babel/eslint-parser';
import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

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

export default [
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
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginPrettier,

  // JavaScript files
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelEslintParser,
      parserOptions: parserOptionsJs,
    },
    rules: {
      'import/no-duplicates': 'error',
    },
  },

  // Configuration files
  {
    files: ['**/*.cjs'],
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
];
