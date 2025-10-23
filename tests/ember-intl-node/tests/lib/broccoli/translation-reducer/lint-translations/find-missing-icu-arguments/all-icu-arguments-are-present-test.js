import { expect } from 'chai';
import findMissingIcuArguments from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/find-missing-icu-arguments.js';

describe('lib | broccoli | translation-reducer | lint-translations | find-missing-icu-arguments', function () {
  it('all ICU arguments are present', function () {
    const allIcuArguments = {
      'some-key': ['timestamp', 'name', 'numPhotos'],
    };

    const locales = ['de', 'en'];

    const localeToIcuArguments = {
      de: {
        'some-key': ['name', 'timestamp', 'numPhotos'],
      },
      en: {
        'some-key': ['name', 'timestamp', 'numPhotos'],
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
