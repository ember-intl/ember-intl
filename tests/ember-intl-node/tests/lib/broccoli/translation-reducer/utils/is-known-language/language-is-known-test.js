import { expect } from 'chai';
import isKnownLanguage from 'ember-intl/lib/broccoli/translation-reducer/utils/is-known-language.js';

describe('lib | broccoli | translation-reducer | utils | is-known-language', function () {
  it('language is known', function () {
    expect(isKnownLanguage('de')).to.equal(true);
    expect(isKnownLanguage('en')).to.equal(true);
    expect(isKnownLanguage('es')).to.equal(true);
  });
});
