import type { CodemodOptions, Options } from '../../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v8/v1-app',
};

const options: Options = {
  packageType: 'v1-app',
  projectRoot: 'tmp/v8/v1-app',
  src: 'app',
  targetVersion: 9,
};

export { codemodOptions, options };
