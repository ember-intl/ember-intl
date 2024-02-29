import { expect } from 'chai';
import findMissingTranslations from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-translations.js';

describe('lib | broccoli | translation-reducer | linter | find-missing-translations', function () {
  it('some locales do not have the key', function () {
    const localeKeys = [
      ['de', ['some-key']],
      ['en', []],
    ];

    const output = findMissingTranslations('some-key', localeKeys);

    expect(output).to.deep.equal(['en']);
  });
});
