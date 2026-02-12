export default {
  lintRules: {
    'no-missing-keys': {
      ignores: ['lazy-hello.message'],
    },
    'no-unused-keys': {
      ignores: ['hello.message', 'hello.world'],
    },
  },
};
