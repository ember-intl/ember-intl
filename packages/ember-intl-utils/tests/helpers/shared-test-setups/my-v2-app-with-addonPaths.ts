import { getDefaultConfig, mergeConfigs } from '../../../src/config.js';
import type { Options } from '../../../src/types/index.js';

const codemodOptions = {
  projectRoot: 'tmp/my-v2-app-with-addonPaths',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  }),
  projectRoot: 'tmp/my-v2-app-with-addonPaths',
  src: 'app',
};

export { codemodOptions, options };
