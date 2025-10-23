import { expect } from 'chai';
import lintTranslations from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/index.js';

describe('lib | broccoli | translation-reducer | lint-translations | index', function () {
  it('we throw an error when ICU argument syntax is not valid', function () {
    expect(() => {
      lintTranslations({
        de: {
          'some-key':
            'Du hast {count, plural, =0 {keine Katzen} =1 {eine Katze} other {viele Katzen}}.',
        },
        en: {
          'some-key':
            'You have {count, plural, =0 {no cats} =1 {one {cat} other {many cats}}.',
        },
      });
    }).to.throw(
      `An error occurred while extracting ICU arguments for 'You have {count, plural, =0 {no cats} =1 {one {cat} other {many cats}}.' (MALFORMED_ARGUMENT)`,
    );
  });
});
