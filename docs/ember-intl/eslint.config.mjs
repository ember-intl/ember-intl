import baseConfiguration from '@shared-configs/eslint-config-ember/v1-app';

export default [
  ...baseConfiguration,
  {
    ignores: ['app/snippets/'],
  },
];
