import { getDefaultConfig } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v1-addon',
};

const options: Options = {
  config: getDefaultConfig(),
  fix: false,
  projectRoot: 'tmp/my-v1-addon',
  src: 'addon',
};

export { codemodOptions, options };
