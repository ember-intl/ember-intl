import baseConfiguration from '@shared-configs/eslint-config-node/typescript';
import globals from 'globals';

export default [
  ...baseConfiguration,
  {
    files: ['tests/**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    files: ['tests-mocha/**/*.{cjs,cts,js,ts}'],
    languageOptions: {
      globals: globals.mocha,
    },
  },
];
