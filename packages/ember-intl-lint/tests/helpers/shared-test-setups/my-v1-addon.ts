import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v1-addon',
};

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  },
  fix: false,
  projectRoot: 'tmp/my-v1-addon',
  src: 'addon',
};

export { codemodOptions, options };
