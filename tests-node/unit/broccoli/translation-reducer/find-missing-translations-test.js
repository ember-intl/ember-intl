const expect = require('chai').expect;

const findLocalesMissingTranslation = require('../../../../lib/broccoli/translation-reducer/linter/find-missing-translations');

describe('findLocalesMissingTranslation', function () {
  it('finds nothing if nothing is missing', function () {
    const key = 'foo';
    const localeKeys = [
      ['de', ['foo']],
      ['en', ['foo']],
    ];

    expect(findLocalesMissingTranslation(key, localeKeys)).to.deep.equal([]);
  });

  it('finds missing translations', function () {
    const key = 'foo';
    const localeKeys = [
      ['de', ['foo']],
      ['en', ['bar']],
    ];

    expect(findLocalesMissingTranslation(key, localeKeys)).to.deep.equal([
      'en',
    ]);
  });
});
