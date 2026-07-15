import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-addon',
};

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': {
        ignores: ['routes.index.key-to-overwrite'],
      },
    },
  },
  fix: false,
  projectRoot: 'tmp/my-v2-addon',
  src: 'src',
};

export { codemodOptions, options };
