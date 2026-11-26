import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-addonPaths',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  }),
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-addonPaths',
  src: 'app',
};

export { codemodOptions, options };
