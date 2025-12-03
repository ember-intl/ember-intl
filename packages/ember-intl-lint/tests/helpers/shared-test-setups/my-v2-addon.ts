import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-addon',
};

const options: Options = {
  config: {
    addonPaths: [],
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  },
  fix: false,
  projectRoot: 'tmp/my-v2-addon',
  src: 'src',
};

export { codemodOptions, options };
