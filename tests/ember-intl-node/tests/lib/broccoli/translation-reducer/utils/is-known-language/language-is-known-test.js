import isKnownLanguage from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/utils/is-known-language.js';
import { expect } from 'chai';

describe('lib | broccoli | translation-reducer | utils | is-known-language', function () {
  it('language is known', function () {
    expect(isKnownLanguage('de')).to.equal(true);
    expect(isKnownLanguage('en')).to.equal(true);
    expect(isKnownLanguage('es')).to.equal(true);
  });
});
