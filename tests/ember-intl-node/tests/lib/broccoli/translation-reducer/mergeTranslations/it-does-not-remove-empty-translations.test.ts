import { join } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';
import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer.js';

test('lib | broccoli | translation-reducer | mergeTranslations > it does not remove empty translations', function () {
  const inputProject = {
    'de-de.yaml': normalizeFile([
      `sample_translation:`,
      `  translation_1: Lorem ipsum`,
      `  translation_2: ""`,
      `  translation_3:`,
      ``,
    ]),
    'en-us.yaml': normalizeFile([
      `sample_translation:`,
      `  translation_1: Lorem ipsum`,
      `  translation_2: dolor sit amet`,
      ``,
    ]),
  };

  const projectRoot = 'tmp/broccoli_merge_trees';
  const inputPath = join(projectRoot);

  loadFixture(inputProject, { projectRoot });

  const outputNode = new TranslationReducer(inputPath, {
    addonsWithTranslations: [],
  });

  const translations = outputNode.mergeTranslations([
    join(inputPath, 'de-de.yaml'),
    join(inputPath, 'en-us.yaml'),
  ]);

  assert.deepStrictEqual(translations, {
    'de-de': {
      sample_translation: {
        translation_1: 'Lorem ipsum',
        translation_2: '',
        translation_3: null,
      },
    },
    'en-us': {
      sample_translation: {
        translation_1: 'Lorem ipsum',
        translation_2: 'dolor sit amet',
      },
    },
  });
});
