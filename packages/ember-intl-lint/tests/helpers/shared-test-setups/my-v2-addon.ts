import { getDefaultConfig, mergeConfigs } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-addon',
};

const options: Options = {
  config: mergeConfigs(getDefaultConfig(), {
    lintOptions: {
      rules: {
        'no-unused-keys': {
          ignores: ['routes.index.key-to-overwrite'],
        },
      },
    },
  }),
  fix: false,
  projectRoot: 'tmp/my-v2-addon',
  src: 'src',
};

export { codemodOptions, options };
