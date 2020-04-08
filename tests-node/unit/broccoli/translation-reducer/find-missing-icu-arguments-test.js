const expect = require('chai').expect;

const findMissingICUArguments = require('../../../../lib/broccoli/translation-reducer/linter/find-missing-icu-arguments');

const isTrue = () => true;

describe('findMissingICUArguments', function () {
  it('finds nothing if nothing is missing', function () {
    const key = 'foo';
    const allIcuArguments = { foo: ['aa'] };
    const locales = ['de', 'en'];
    const icuArguments = {
      de: { foo: ['aa'] },
      en: { foo: ['aa'] },
    };

    expect(findMissingICUArguments(key, allIcuArguments, locales, icuArguments, isTrue)).to.deep.equal([]);
  });

  it('finds missing icu arguments', function () {
    const key = 'baz';
    const allIcuArguments = { baz: ['arg0', 'arg1', 'arg2'] };
    const locales = ['de', 'en'];
    const icuArguments = {
      de: { baz: ['arg0', 'arg2'] },
      en: { baz: ['arg1', 'arg2'] },
    };

    expect(findMissingICUArguments(key, allIcuArguments, locales, icuArguments, isTrue)).to.deep.equal([
      ['de', ['arg1']],
      ['en', ['arg0']],
    ]);
  });

  it('ignores missing icu arguments if not required', function() {
    const key = 'baz';
    const allIcuArguments = { baz: ['arg0', 'arg1', 'arg2'] };
    const locales = ['de', 'en'];
    const icuArguments = {
      de: { baz: ['arg0', 'arg2'] },
      en: { baz: ['arg1', 'arg2'] },
    };
    const isAllowed = (key, locale) => locale !== 'en';

    expect(findMissingICUArguments(key, allIcuArguments, locales, icuArguments, isAllowed)).to.deep.equal([
      ['de', ['arg1']]
    ]);
  });
});
