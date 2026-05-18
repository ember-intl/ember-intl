import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v1-addon-v6',
};

const options: Options = {
  packageType: 'v1-addon',
  projectRoot: 'tmp/v1-addon-v6',
  src: 'addon',
  targetVersion: 7,
};

export { codemodOptions, options };
