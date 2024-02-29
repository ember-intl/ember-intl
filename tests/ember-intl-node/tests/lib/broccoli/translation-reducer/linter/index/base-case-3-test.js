import { expect } from 'chai';
import Linter from 'ember-intl/lib/broccoli/translation-reducer/linter/index.js';

describe('lib | broccoli | translation-reducer | linter | index', function () {
  it('base case (3)', function () {
    const linter = new Linter({
      requiresTranslation() {
        return true;
      },
    });

    const output = linter.lint({
      de: {
        'key-with-argument': 'Hallo {name}!',
        'key-with-date': 'Es ist jetzt {timestamp, date, long}.',
        'key-with-plural':
          'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
        'key-with-select':
          '{gender, select, female {Sie ist} male {Er ist} other {Dey ist}} cool.}',
        'key-with-time': 'Es ist jetzt {timestamp, time, short}.',
      },
      en: {
        'key-with-argument': 'Hello {name}!',
        'key-with-date': 'It is now {timestamp, date, long}.',
        'key-with-plural':
          'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.',
        'key-with-select':
          '{gender, select, female {She is} male {He is} other {They are}} cool.}',
        'key-with-time': 'It is now {timestamp, time, short}.',
      },
    });

    expect(output).to.deep.equal({
      icuMismatch: [],
      missingTranslations: [],
    });
  });
});
