import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-fallbacks';

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: 'en-us',
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  },
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
};

export { options, projectRoot };
