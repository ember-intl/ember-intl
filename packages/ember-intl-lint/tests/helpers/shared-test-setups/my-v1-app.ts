import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/my-v1-app',
};

const options: Options = {
  config: {
    addonPaths: [],
    rules: {
      'find-missing-keys': true,
      'find-unused-keys': true,
    },
  },
  projectRoot: 'tmp/my-v1-app',
};

export { codemodOptions, options };
