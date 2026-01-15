export default {
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  buildOptions: {
    publicOnly: true,
  },
  lintRules: {
    'no-missing-keys': {
      ignores: ['routes.index.key-without-translation'],
    },
  },
};
