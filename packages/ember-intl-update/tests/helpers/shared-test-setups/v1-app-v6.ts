import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v1-app-v6',
};

const options: Options = {
  projectRoot: 'tmp/v1-app-v6',
  src: 'app',
  targetVersion: 7,
};

export { codemodOptions, options };
