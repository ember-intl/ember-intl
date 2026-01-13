import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-addonPaths';

const options: Options = {
  config: {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      publicOnly: false,
      wrapTranslationsWithNamespace: false,
    },
  },
  projectRoot: 'tmp/my-v2-app-with-addonPaths',
};

export { options, projectRoot };
