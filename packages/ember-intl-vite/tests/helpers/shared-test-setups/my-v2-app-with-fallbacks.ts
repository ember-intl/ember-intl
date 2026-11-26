import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-fallbacks';

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    buildOptions: {
      fallbackLocale: 'en-us',
    },
  }),
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
};

export { options, projectRoot };
