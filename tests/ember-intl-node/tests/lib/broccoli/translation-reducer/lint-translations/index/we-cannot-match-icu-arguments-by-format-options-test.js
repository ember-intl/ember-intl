import { expect } from 'chai';
import lintTranslations from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/index.js';

describe('lib | broccoli | translation-reducer | lint-translations | index', function () {
  it('we cannot match ICU arguments by format options', function () {
    const output = lintTranslations({
      de: {
        'key-with-date': 'Es ist jetzt {timestamp, date, long}.',
        'key-with-time': 'Es ist jetzt {timestamp, time, long}.',
      },
      en: {
        'key-with-date': 'It is now {timestamp, time, long}.',
        'key-with-time': 'Es ist jetzt {timestamp, time, short}.',
      },
    });

    expect(output).to.deep.equal({
      icuMismatch: [],
      missingTranslations: [],
    });
  });
});
