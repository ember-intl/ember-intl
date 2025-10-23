import findMissingIcuArguments from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/lint-translations/find-missing-icu-arguments.js';
import { expect } from 'chai';

describe('lib | broccoli | translation-reducer | lint-translations | find-missing-icu-arguments', function () {
  it('some ICU arguments are missing', function () {
    const allIcuArguments = {
      'some-key': ['timestamp', 'name', 'numPhotos'],
    };

    const locales = ['de', 'en'];

    const localeToIcuArguments = {
      de: {
        'some-key': ['name', 'timestamp'],
      },
      en: {
        'some-key': ['name'],
      },
    };

    const output = findMissingIcuArguments('some-key', {
      allIcuArguments,
      locales,
      localeToIcuArguments,
    });

    expect(output).to.deep.equal([
      ['de', ['numPhotos']],
      ['en', ['timestamp', 'numPhotos']],
    ]);
  });
});
