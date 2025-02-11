import baseConfiguration from '@shared-configs/eslint-config-ember/v1-addon';
import globals from 'globals';

export default [
  ...baseConfiguration,
  {
    files: ['**/*.{gts,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['lib/**/*.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
