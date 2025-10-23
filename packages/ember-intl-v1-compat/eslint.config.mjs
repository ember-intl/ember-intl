import baseConfiguration from '@shared-configs/eslint-config-ember/v1-addon';
import globals from 'globals';

export default [
  ...baseConfiguration,
  {
    files: ['lib/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
