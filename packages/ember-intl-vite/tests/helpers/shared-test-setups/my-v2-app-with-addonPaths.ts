import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app-with-addonPaths';

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  }),
  projectRoot: 'tmp/my-v2-app-with-addonPaths',
};

export { options, projectRoot };
