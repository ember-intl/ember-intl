import type { CodemodOptions, Options } from '../../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v8/v2-app',
};

const options: Options = {
  packageType: 'v2-app',
  projectRoot: 'tmp/v8/v2-app',
  src: 'app',
  targetVersion: 9,
};

export { codemodOptions, options };
