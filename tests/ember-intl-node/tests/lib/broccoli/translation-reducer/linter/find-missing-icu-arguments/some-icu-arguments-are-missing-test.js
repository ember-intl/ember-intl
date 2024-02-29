import { expect } from 'chai';
import findMissingICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-icu-arguments.js';

describe('lib | broccoli | translation-reducer | linter | find-missing-icu-arguments', function () {
  it('some ICU arguments are missing', function () {
    const allIcuArguments = {
      'some-key': ['timestamp', 'name', 'numPhotos'],
    };

    const icuArguments = {
      de: {
        'some-key': ['name', 'timestamp'],
      },
      en: {
        'some-key': ['name'],
      },
    };

    const locales = ['de', 'en'];

    const output = findMissingICUArguments(
      'some-key',
      allIcuArguments,
      locales,
      icuArguments,
    );

    expect(output).to.deep.equal([
      ['de', ['numPhotos']],
      ['en', ['timestamp', 'numPhotos']],
    ]);
  });
});
