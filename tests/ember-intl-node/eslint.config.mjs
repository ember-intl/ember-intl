import baseConfiguration from '@shared-configs/eslint-config-node/typescript';
import globals from 'globals';

export default [
  ...baseConfiguration,
  {
    files: ['{tests,unit}/**/*.{cjs,cts,js,ts}'],
    languageOptions: {
      globals: globals.mocha,
    },
  },
];
