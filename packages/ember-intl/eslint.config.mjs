import eslintConfigEmberV1Addon from '@shared-configs/eslint-config-ember/v1-addon/index.js';

export default [
  ...eslintConfigEmberV1Addon,
  {
    files: ['**/*.{gts,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
