import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    buildOptions: {
      fallbackLocale: 'en-us',
    },
  }),
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
  src: 'app',
};

export { codemodOptions, options };
