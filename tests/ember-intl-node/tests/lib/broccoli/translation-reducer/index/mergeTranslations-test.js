import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';
import TranslationReducer from 'ember-intl/lib/broccoli/translation-reducer/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixtureFilePaths = [
  join(__dirname, '../../../../fixtures/stripEmptyTranslations/de-de.yaml'),
  join(__dirname, '../../../../fixtures/stripEmptyTranslations/en-us.yaml'),
];

describe('lib | broccoli | translation-reducer | index | mergeTranslations', function () {
  it('does not remove empty translations, if stripEmptyTranslations is falsy', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path());

      const translations = subject.mergeTranslations(fixtureFilePaths);

      expect(translations).to.deep.equal({
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
    } finally {
      await input.dispose();
    }
  });

  it('removes empty translations, if stripEmptyTranslations is true', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        stripEmptyTranslations: true,
      });

      const translations = subject.mergeTranslations(fixtureFilePaths);

      expect(translations).to.deep.equal({
        'de-de': {
          sample_translation: {
            translation_1: 'Lorem ipsum',
          },
        },
        'en-us': {
          sample_translation: {
            translation_1: 'Lorem ipsum',
            translation_2: 'dolor sit amet',
          },
        },
      });
    } finally {
      await input.dispose();
    }
  });
});
