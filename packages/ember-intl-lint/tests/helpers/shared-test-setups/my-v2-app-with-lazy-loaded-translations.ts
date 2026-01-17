import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-lazy-loaded-translations',
};

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'public/assets/translations',
      wrapTranslationsWithNamespace: false,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  },
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-lazy-loaded-translations',
  src: 'app',
};

export { codemodOptions, options };
