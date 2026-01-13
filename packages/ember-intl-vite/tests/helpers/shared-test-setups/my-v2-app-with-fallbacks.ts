import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-fallbacks';

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: 'en-us',
      inputPath: 'translations',
      publicOnly: false,
      wrapTranslationsWithNamespace: false,
    },
  },
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
};

export { options, projectRoot };
