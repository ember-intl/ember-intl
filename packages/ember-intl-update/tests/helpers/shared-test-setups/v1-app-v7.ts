import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v1-app-v7',
};

const options: Options = {
  packageType: 'v1-app',
  projectRoot: 'tmp/v1-app-v7',
  src: 'app',
  targetVersion: 8,
};

export { codemodOptions, options };
