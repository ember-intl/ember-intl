import { expect } from 'chai';
import Linter from 'ember-intl/lib/broccoli/translation-reducer/linter/index.js';

describe('lib | broccoli | translation-reducer | linter | index', function () {
  it('we can find missing translations', function () {
    const linter = new Linter({
      requiresTranslation() {
        return true;
      },
    });

    const output = linter.lint({
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
