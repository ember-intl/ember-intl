import type { CodemodOptions, Options } from '../../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v8/v2-addon',
};

const options: Options = {
  packageType: 'v2-addon',
  projectRoot: 'tmp/v8/v2-addon',
  src: 'src',
  targetVersion: 9,
};

export { codemodOptions, options };
