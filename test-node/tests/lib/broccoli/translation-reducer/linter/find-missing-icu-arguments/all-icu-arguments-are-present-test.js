import { expect } from 'chai';
import findMissingICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-icu-arguments.js';

describe('lib | broccoli | translation-reducer | linter | find-missing-icu-arguments', function () {
  it('all ICU arguments are present', function () {
    const allIcuArguments = {
      'some-key': ['timestamp', 'name', 'numPhotos'],
    };

    const icuArguments = {
      de: {
        'some-key': ['name', 'timestamp', 'numPhotos'],
      },
      en: {
        'some-key': ['name', 'timestamp', 'numPhotos'],
      },
    };

    const locales = ['de', 'en'];

    const output = findMissingICUArguments(
      'some-key',
      allIcuArguments,
      locales,
      icuArguments,
    );

    expect(output).to.deep.equal([]);
  });
});
