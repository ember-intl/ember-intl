import { join } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';
import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer.js';

test('lib | broccoli | translation-reducer | mergeTranslations > translations from app (namespaceKeysByDir is false)', function () {
  const inputProject = {
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
  };

  const projectRoot = 'tmp/broccoli_merge_trees';

  loadFixture(inputProject, { projectRoot });

  const outputNode = new TranslationReducer([projectRoot], {
    addonsWithTranslations: [],
  });

  let translations = outputNode.mergeTranslations([
    join(projectRoot, 'components/hello/en-us.yaml'),
    join(projectRoot, 'components/en-us.yaml'),
    join(projectRoot, 'en-us.yaml'),
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
    join(projectRoot, 'en-us.yaml'),
    join(projectRoot, 'components/en-us.yaml'),
    join(projectRoot, 'components/hello/en-us.yaml'),
  ]);

  assert.deepStrictEqual(translations, {
    'en-us': {
      foo: 'bar',
      message: 'Hello, {name}!',
      title: '<Hello> component',
    },
  });
});
