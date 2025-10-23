import { expect } from 'chai';
import lintTranslations from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/index.js';

describe('lib | broccoli | translation-reducer | lint-translations | index', function () {
  it('we can find missing translations', function () {
    const output = lintTranslations({
      de: {
        'key-with-argument': 'Hallo {name}!',
        nested: {
          key: 'Hallo {name}!',
        },
      },
      en: {
        'key-with-argument': 'Hello {name}!',
      },
      es: {
        'key-with-time': 'Es ist jetzt {timestamp, time, short}.',
      },
    });

    expect(output).to.deep.equal({
      icuMismatch: [],
      missingTranslations: [
        ['key-with-argument', ['es']],
        ['nested.key', ['en', 'es']],
        ['key-with-time', ['de', 'en']],
      ],
    });
  });
});
