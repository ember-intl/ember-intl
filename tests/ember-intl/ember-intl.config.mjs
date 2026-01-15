export default {
  lintRules: {
    'no-missing-keys': {
      ignores: ['lazy-hello.message', 'smoke-tests.hello.world'],
    },
    'no-unused-keys': {
      ignores: ['hello.message', 'hello.world'],
    },
  },
};
