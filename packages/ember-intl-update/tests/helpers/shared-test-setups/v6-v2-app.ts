import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/v6-v2-app',
};

const options: Options = {
  packageType: 'v2-app',
  projectRoot: 'tmp/v6-v2-app',
  src: 'app',
  targetVersion: 7,
};

export { codemodOptions, options };
