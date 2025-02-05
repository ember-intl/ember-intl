import eslintConfigNodeTypescript from '@shared-configs/eslint-config-node/typescript/index.js';
import globals from 'globals';

export default [
  ...eslintConfigNodeTypescript,
  {
    files: ['{tests,unit}/**/*.{cjs,cts,js,ts}'],
    languageOptions: {
      globals: globals.mocha,
    },
  },
];
