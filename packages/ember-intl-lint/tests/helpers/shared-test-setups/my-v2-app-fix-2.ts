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
          'components.title',
          'components.translation-with-arguments.message',
          'components.translation-with-arguments.title',
          'routes.application.title',
          'routes.index.key-to-overwrite',
          'routes.index.title',
        ],
      },
      'no-missing-keys': {
        ignores: [
          'components.title',
          'routes.application.title',
          'routes.index.key-to-overwrite',
          'routes.index.title',
        ],
      },
      'no-unused-keys': {
        ignores: ['components.title'],
      },
    },
  },
  fix: true,
  projectRoot: 'tmp/my-v2-app-fix-2',
  src: 'app',
};

export { codemodOptions, options };
