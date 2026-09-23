export default {
  lintRules: {
    'no-inconsistent-messages': {
      ignores: [
        'components.title',
        'components.translation-with-arguments.message',
        'components.translation-with-arguments.title',
        'routes.application.title',
        'routes.index.key-to-overwrite',
        'routes.index.title',
      ],
    },
    'no-missing-keys': {
      ignores: [
        'components.title',
        'routes.application.title',
        'routes.index.key-to-overwrite',
        'routes.index.title',
      ],
    },
    'no-unused-keys': {
      ignores: ['components.title'],
    },
  },
};
