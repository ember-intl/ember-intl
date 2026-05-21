import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v7-v2-addon',
};

const options: Options = {
  packageType: 'v2-addon',
  projectRoot: 'tmp/v7-v2-addon',
  src: 'src',
  targetVersion: 8,
};

export { codemodOptions, options };
