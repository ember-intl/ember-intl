import { getDefaultConfig } from '@ember-intl/utils/config';

import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: true,
  projectRoot: 'tmp/my-v2-app-fix-1',
};

const options: Options = {
  config: getDefaultConfig(),
  fix: true,
  projectRoot: 'tmp/my-v2-app-fix-1',
  src: 'app',
};

export { codemodOptions, options };
