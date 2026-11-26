import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-dependencies',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    lintOptions: {
      dependencies: {
        t: [{ importName: 't', importPath: 'my-app/utils/intl' }],
        tKey: [{ importName: 'tKey', importPath: 'my-app/utils/intl' }],
      },
    },
  }),
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-dependencies',
  src: 'app',
};

export { codemodOptions, options };
