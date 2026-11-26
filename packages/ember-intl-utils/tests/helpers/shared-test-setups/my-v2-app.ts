import { getDefaultConfig } from '../../../src/config.js';
import type { Options } from '../../../src/types/index.js';

const codemodOptions = {
  projectRoot: 'tmp/my-v2-app',
};

const options: Options = {
  config: getDefaultConfig(),
  projectRoot: 'tmp/my-v2-app',
  src: 'app',
};

export { codemodOptions, options };
