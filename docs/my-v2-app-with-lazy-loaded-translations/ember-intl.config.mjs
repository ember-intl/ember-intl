export default {
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  lintRules: {
    'no-missing-keys': {
      ignores: ['routes.index.key-without-translation'],
    },
    'no-unused-keys': false,
  },
};
