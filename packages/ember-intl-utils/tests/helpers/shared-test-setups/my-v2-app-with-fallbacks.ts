import type { Options } from '../../../src/types/index.js';

const codemodOptions = {
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
};

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: 'en-us',
      translationsDir: 'translations',
      namespaceKeysByDir: false,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  },
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
  src: 'app',
};

export { codemodOptions, options };
