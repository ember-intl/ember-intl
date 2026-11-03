import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-dependencies',
};

const options: Options = {
  config: {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintOptions: {
      dependencies: {
        t: [{ importName: 't', importPath: 'my-app/utils/intl' }],
        tKey: [{ importName: 'tKey', importPath: 'my-app/utils/intl' }],
      },
      rules: {
        'no-inconsistent-messages': true,
        'no-missing-keys': true,
        'no-unused-keys': true,
      },
    },
  },
  fix: false,
  projectRoot: 'tmp/my-v2-app-with-dependencies',
  src: 'app',
};

export { codemodOptions, options };
