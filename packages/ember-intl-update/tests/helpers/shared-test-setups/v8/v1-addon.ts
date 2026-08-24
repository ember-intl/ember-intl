import type { CodemodOptions, Options } from '../../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v8/v1-addon',
};

const options: Options = {
  packageType: 'v1-addon',
  projectRoot: 'tmp/v8/v1-addon',
  src: 'addon',
  targetVersion: 9,
};

export { codemodOptions, options };
