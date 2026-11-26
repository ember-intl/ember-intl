import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-lazy-loaded-translations',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    buildOptions: {
      translationsDir: 'public/assets/translations',
    },
  }),
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-lazy-loaded-translations',
  src: 'app',
};

export { codemodOptions, options };
