const expect = require('chai').expect;

const findMissingICUArguments = require('ember-intl/lib/broccoli/translation-reducer/linter/find-missing-icu-arguments');

describe('findMissingICUArguments', function () {
  it('finds nothing if nothing is missing', function () {
    const key = 'foo';
    const allIcuArguments = { foo: ['aa'] };
    const locales = ['de', 'en'];
    const icuArguments = {
      de: { foo: ['aa'] },
      en: { foo: ['aa'] },
    };

    expect(
      findMissingICUArguments(key, allIcuArguments, locales, icuArguments),
    ).to.deep.equal([]);
  });

  it('finds missing icu arguments', function () {
    const key = 'baz';
    const allIcuArguments = { baz: ['arg0', 'arg1', 'arg2'] };
    const locales = ['de', 'en'];
    const icuArguments = {
      de: { baz: ['arg0', 'arg2'] },
      en: { baz: ['arg1', 'arg2'] },
    };

    expect(
      findMissingICUArguments(key, allIcuArguments, locales, icuArguments),
    ).to.deep.equal([
      ['de', ['arg1']],
      ['en', ['arg0']],
    ]);
  });
});
