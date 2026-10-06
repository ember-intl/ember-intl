import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-addonPaths';

const options: Options = {
  config: {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    buildOptions: {
      fallbackLocale: undefined,
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  },
  projectRoot: 'tmp/my-v2-app-with-addonPaths',
};

export { options, projectRoot };
