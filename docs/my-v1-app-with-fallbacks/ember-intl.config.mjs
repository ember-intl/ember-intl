export default {
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  lintRules: {
    'no-inconsistent-messages': {
      ignores: ['components.title', 'routes.index.title'],
    },
    'no-missing-keys': {
      ignores: [
        'components.component-from-app.message',
        'routes.index.key-without-translation',
      ],
    },
  },
};
