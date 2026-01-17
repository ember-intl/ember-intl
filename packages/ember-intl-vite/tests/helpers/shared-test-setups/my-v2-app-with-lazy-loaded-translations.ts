import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-lazy-loaded-translations';

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'public/assets/translations',
      wrapTranslationsWithNamespace: false,
    },
  },
  projectRoot: 'tmp/my-v2-app-with-lazy-loaded-translations',
};

export { options, projectRoot };
