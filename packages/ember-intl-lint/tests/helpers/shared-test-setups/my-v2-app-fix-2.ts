import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  fix: true,
  projectRoot: 'tmp/my-v2-app-fix-2',
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
      'no-inconsistent-messages': {
        ignores: [
          'components.translation-with-arguments.message',
          /^routes\.index\./,
          /^routes\.application\./,
          /\.title$/,
          /\.message$/,
        ],
      },
      'no-missing-keys': {
        ignores: [
          /^routes\.application\./,
          'components.title',
          'routes.application.title',
          'routes.index.key-to-overwrite',
          'routes.index.title',
        ],
      },
      'no-unused-keys': {
        ignores: [
          'components.title',
          /^components\.translation-with-arguments\./,
        ],
      },
    },
  },
  fix: true,
  projectRoot: 'tmp/my-v2-app-fix-2',
  src: 'app',
};

export { codemodOptions, options };
