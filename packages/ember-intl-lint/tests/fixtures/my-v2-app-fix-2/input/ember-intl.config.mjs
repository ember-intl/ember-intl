export default {
  lintRules: {
    'no-inconsistent-messages': {
      ignores: [
        'components.translation-with-arguments.message',
        /^routes\.index\./,
        /^routes\.application\./,
        /\.title$/,
        /\.message$/,
      ],
    },
    'no-missing-keys': {
      ignores: [
        /^routes\.application\./,
        'components.title',
        'routes.application.title',
        'routes.index.key-to-overwrite',
        'routes.index.title',
      ],
    },
    'no-unused-keys': {
      ignores: [
        'components.title',
        /^components\.translation-with-arguments\./,
      ],
    },
  },
};
