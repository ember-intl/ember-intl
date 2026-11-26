import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-namespace-from-folders',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    buildOptions: {
      namespaceKeysByDir: true,
    },
  }),
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-namespace-from-folders',
  src: 'app',
};

export { codemodOptions, options };
