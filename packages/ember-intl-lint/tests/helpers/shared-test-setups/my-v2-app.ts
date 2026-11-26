import { getDefaultConfig } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app',
};

const options: Options = {
  config: getDefaultConfig(),
  fix: false,
  projectRoot: 'tmp/my-v2-app',
  src: 'app',
};

export { codemodOptions, options };
