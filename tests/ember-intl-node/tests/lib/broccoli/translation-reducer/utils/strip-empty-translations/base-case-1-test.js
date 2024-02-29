import { expect } from 'chai';
import stripEmptyTranslations from 'ember-intl/lib/broccoli/translation-reducer/utils/strip-empty-translations.js';

describe('lib | broccoli | translation-reducer | utils | strip-empty-translations', function () {
  it('base case (1)', function () {
    const output = stripEmptyTranslations({});

    expect(output).to.deep.equal({});
  });
});
