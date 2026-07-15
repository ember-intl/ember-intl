import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app';

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
  },
  projectRoot: 'tmp/my-v2-app',
};

export { options, projectRoot };
