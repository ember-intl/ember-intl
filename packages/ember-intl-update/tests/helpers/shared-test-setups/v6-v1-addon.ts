import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v6-v1-addon',
};

const options: Options = {
  packageType: 'v1-addon',
  projectRoot: 'tmp/v6-v1-addon',
  src: 'addon',
  targetVersion: 7,
};

export { codemodOptions, options };
