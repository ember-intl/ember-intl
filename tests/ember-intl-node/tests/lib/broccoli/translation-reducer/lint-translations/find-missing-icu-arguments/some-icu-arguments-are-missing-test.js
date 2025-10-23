import { expect } from 'chai';
import findMissingIcuArguments from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/find-missing-icu-arguments.js';

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
