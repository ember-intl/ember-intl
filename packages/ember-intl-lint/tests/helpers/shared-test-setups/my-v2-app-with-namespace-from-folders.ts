import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-namespace-from-folders',
};

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: true,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  },
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-namespace-from-folders',
  src: 'app',
};

export { codemodOptions, options };
