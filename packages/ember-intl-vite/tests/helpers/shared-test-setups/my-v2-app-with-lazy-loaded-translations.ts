import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-lazy-loaded-translations';

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    buildOptions: {
      translationsDir: 'public/assets/translations',
    },
  }),
  projectRoot: 'tmp/my-v2-app-with-lazy-loaded-translations',
};

export { options, projectRoot };
