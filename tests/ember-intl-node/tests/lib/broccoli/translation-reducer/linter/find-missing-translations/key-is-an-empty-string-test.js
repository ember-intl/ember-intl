import { expect } from 'chai';
import findMissingTranslations from 'ember-intl-v1-compat/lib/broccoli/translation-reducer/linter/find-missing-translations.js';

describe('lib | broccoli | translation-reducer | linter | find-missing-translations', function () {
  it('key is an empty string', function () {
    const localeKeys = [
      ['de', ['some-key']],
      ['en', ['some-key']],
    ];

    const output = findMissingTranslations('', localeKeys);

    expect(output).to.deep.equal(['de', 'en']);
  });
});
