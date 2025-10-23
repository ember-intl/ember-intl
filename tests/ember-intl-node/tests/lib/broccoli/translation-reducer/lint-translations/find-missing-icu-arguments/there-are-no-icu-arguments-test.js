import findMissingIcuArguments from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/lint-translations/find-missing-icu-arguments.js';
import { expect } from 'chai';

describe('lib | broccoli | translation-reducer | lint-translations | find-missing-icu-arguments', function () {
  it('there are no ICU arguments', function () {
    const allIcuArguments = {
      'some-key': [],
    };

    const locales = ['de', 'en'];

    const localeToIcuArguments = {
      de: {
        'some-key': [],
      },
      en: {
        'some-key': [],
      },
    };

    const output = findMissingIcuArguments('some-key', {
      allIcuArguments,
      locales,
      localeToIcuArguments,
    });

    expect(output).to.deep.equal([]);
  });
});
