import { getDefaultConfig } from '@ember-intl/utils/config';

import type { Options } from '../../../src/types/index.js';

const projectRoot = 'tmp/my-v2-app';

const options: Options = {
  config: getDefaultConfig(),
  projectRoot: 'tmp/my-v2-app',
};

export { options, projectRoot };
