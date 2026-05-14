import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v2-app-v7',
};

const options: Options = {
  projectRoot: 'tmp/v2-app-v7',
  src: 'app',
  targetVersion: 8,
};

export { codemodOptions, options };
