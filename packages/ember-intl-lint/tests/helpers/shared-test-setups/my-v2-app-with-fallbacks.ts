import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
};

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: 'en-us',
      translationsDir: 'translations',
      namespaceKeysByDir: false,
    },
    lintOptions: {
      dependencies: {
        t: [
          { importName: 't', importPath: 'ember-intl' },
          { importName: 'default', importPath: 'ember-intl/helpers/t' },
        ],
        tKey: [
          { importName: 'tKey', importPath: 'ember-intl' },
          { importName: 'default', importPath: 'ember-intl/helpers/t-key' },
        ],
      },
      rules: {
        'no-inconsistent-messages': true,
        'no-missing-keys': true,
        'no-unused-keys': true,
      },
    },
  },
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-fallbacks',
  src: 'app',
};

export { codemodOptions, options };
