import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v7-v1-app',
};

const options: Options = {
  packageType: 'v1-app',
  projectRoot: 'tmp/v7-v1-app',
  src: 'app',
  targetVersion: 8,
};

export { codemodOptions, options };
