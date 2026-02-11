import baseConfiguration from '@shared-configs/eslint-config-node/typescript';

export default [
  ...baseConfiguration,
  {
    ignores: ['src/snippets/'],
  },
];
