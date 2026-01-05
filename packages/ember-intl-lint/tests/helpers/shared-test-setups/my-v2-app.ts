import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app',
};

const options: Options = {
  config: {
    addonPaths: ['node_modules/my-addon'],
    buildOptions: {
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': {
        ignores: ['routes.error.default-message'],
      },
    },
  },
  fix: false,
  projectRoot: 'tmp/my-v2-app',
  src: 'app',
};

export { codemodOptions, options };
