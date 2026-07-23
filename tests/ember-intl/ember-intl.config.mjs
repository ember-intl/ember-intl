export default {
  buildOptions: {
    namespaceKeysByDir: true,
  },
  lintRules: {
    'no-missing-keys': {
      ignores: ['lazy-hello.message'],
    },
    'no-unused-keys': {
      ignores: ['smoke-tests.hello.message', 'smoke-tests.hello.world'],
    },
  },
};
