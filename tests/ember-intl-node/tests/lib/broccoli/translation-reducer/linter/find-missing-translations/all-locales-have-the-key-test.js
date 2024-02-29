import { expect } from 'chai';
import findMissingTranslations from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-translations.js';

describe('lib | broccoli | translation-reducer | linter | find-missing-translations', function () {
  it('all locales have the key', function () {
    const localeKeys = [
      ['de', ['some-key']],
      ['en', ['some-key']],
    ];

    const output = findMissingTranslations('some-key', localeKeys);

    expect(output).to.deep.equal([]);
  });
});
