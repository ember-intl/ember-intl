export default {
  addonPaths: ['node_modules/my-addon'],
  lintRules: {
    'no-unused-keys': {
      ignores: ['routes.error.default-message'],
    },
  },
};
