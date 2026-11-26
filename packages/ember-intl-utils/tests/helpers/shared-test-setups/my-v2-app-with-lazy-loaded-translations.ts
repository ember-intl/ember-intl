import { getDefaultConfig, mergeConfigs } from '../../../src/config.js';
import type { Options } from '../../../src/types/index.js';

const codemodOptions = {
  projectRoot: 'tmp/my-v2-app-with-lazy-loaded-translations',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    buildOptions: {
      translationsDir: 'public/assets/translations',
    },
  }),
  projectRoot: 'tmp/my-v2-app-with-lazy-loaded-translations',
  src: 'app',
};

export { codemodOptions, options };
