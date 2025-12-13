import baseConfiguration from '@shared-configs/eslint-config-node/typescript';

export default [
  ...baseConfiguration,
  {
    files: ['tests/**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
];
