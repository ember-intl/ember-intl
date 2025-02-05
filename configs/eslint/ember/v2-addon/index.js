import babelEslintParser from '@babel/eslint-parser';
import eslint from '@eslint/js';
// eslint-disable-next-line import/no-unresolved
import eslintPluginEmber from 'eslint-plugin-ember/recommended';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
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
    ignores: ['declarations/', 'dist/', 'node_modules/', '!.*', '.*/'],
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
          ignore: ['^@ember', '^ember', 'fetch'],
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
          ignore: ['^@ember', '^ember', 'fetch'],
        },
      ],
      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error',
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
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

  // Configuration files
  {
    files: [
      '**/*.cjs',
      '.prettierrc.js',
      '.stylelintrc.js',
      '.template-lintrc.js',
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
