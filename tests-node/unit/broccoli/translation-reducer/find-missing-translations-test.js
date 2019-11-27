/* eslint-env node */
'use strict';

let expect = require('chai').expect;

let findMissingTranslations = require('../../../../lib/broccoli/translation-reducer/utils/find-missing-translations');
const isTrue = () => true;

describe('findMissingTranslations', function() {
  it('finds nothing if nothing is missing', function() {
    const key = 'foo';
    const localeKeys = [
      ['de', ['foo']],
      ['en', ['foo']]
    ];

    expect(findMissingTranslations(key, localeKeys, isTrue)).to.deep.equal([]);
  });

  it('finds missing translations', function() {
    const key = 'foo';
    const localeKeys = [
      ['de', ['foo']],
      ['en', ['bar']]
    ];

    expect(findMissingTranslations(key, localeKeys, isTrue)).to.deep.equal(['en']);
  });

  it('ignores missing translations if not required', function() {
    const key = 'foo';
    const localeKeys = [
      ['de', ['foo']],
      ['en', ['bar']]
    ];
    const isAllowed = (key, locale) => locale !== 'en';

    expect(findMissingTranslations(key, localeKeys, isAllowed)).to.deep.equal([]);
  });
});
