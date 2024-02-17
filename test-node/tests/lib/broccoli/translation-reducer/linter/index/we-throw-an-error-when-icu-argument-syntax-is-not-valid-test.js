import { expect } from 'chai';
import Linter from 'ember-intl/lib/broccoli/translation-reducer/linter/index.js';

describe('lib | broccoli | translation-reducer | linter | index', function () {
  it('we throw an error when ICU argument syntax is not valid', function () {
    const linter = new Linter({
      requiresTranslation() {
        return true;
      },
    });

    expect(() => {
      linter.lint({
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
      `An error occurred (MALFORMED_ARGUMENT) when extracting ICU arguments for 'You have {count, plural, =0 {no cats} =1 {one {cat} other {many cats}}.'`,
    );
  });
});
