import { getDefaultConfig, mergeConfigs } from '../../../src/config.js';
import type { Options } from '../../../src/types/index.js';

const codemodOptions = {
  projectRoot: 'tmp/my-v2-app-with-namespace-from-folders',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    buildOptions: {
      namespaceKeysByDir: true,
    },
  }),
  projectRoot: 'tmp/my-v2-app-with-namespace-from-folders',
  src: 'app',
};

export { codemodOptions, options };
