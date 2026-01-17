import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-namespace-from-folders';

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: true,
    },
  },
  projectRoot: 'tmp/my-v2-app-with-namespace-from-folders',
};

export { options, projectRoot };
