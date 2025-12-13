import { join } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';
import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer.js';

test('lib | broccoli | translation-reducer | mergeTranslations > translations from addon (wrapTranslationsWithNamespace is false)', function () {
  const inputProject = {
    '__ember-intl-addon__': {
      'my-v1-addon': {
        components: {
          hello: {
            'en-us.yaml': normalizeFile([
              `message: Hello, {name}!`,
              `title: <Hello> component`,
              ``,
            ]),
          },
          'en-us.yaml': normalizeFile([`title: Components`, `foo: bar`, ``]),
        },
        'en-us.yaml': normalizeFile([`title: Homepage`, ``]),
      },
    },
  };

  const projectRoot = 'tmp/broccoli_merge_trees';
  const inputPath = join(projectRoot);

  loadFixture(inputProject, { projectRoot });

  const outputNode = new TranslationReducer(inputPath, {
    addonsWithTranslations: [],
  });

  let translations = outputNode.mergeTranslations([
    join(
      inputPath,
      '__ember-intl-addon__/my-v1-addon/components/hello/en-us.yaml',
    ),
    join(inputPath, '__ember-intl-addon__/my-v1-addon/components/en-us.yaml'),
    join(inputPath, '__ember-intl-addon__/my-v1-addon/en-us.yaml'),
  ]);

  assert.deepStrictEqual(translations, {
    'en-us': {
      foo: 'bar',
      message: 'Hello, {name}!',
      title: 'Homepage',
    },
  });

  // Check order dependency
  translations = outputNode.mergeTranslations([
    join(inputPath, '__ember-intl-addon__/my-v1-addon/en-us.yaml'),
    join(inputPath, '__ember-intl-addon__/my-v1-addon/components/en-us.yaml'),
    join(
      inputPath,
      '__ember-intl-addon__/my-v1-addon/components/hello/en-us.yaml',
    ),
  ]);

  assert.deepStrictEqual(translations, {
    'en-us': {
      foo: 'bar',
      message: 'Hello, {name}!',
      title: '<Hello> component',
    },
  });
});
