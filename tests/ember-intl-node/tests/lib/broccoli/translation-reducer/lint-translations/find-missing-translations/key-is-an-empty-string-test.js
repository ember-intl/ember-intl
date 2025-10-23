import { expect } from 'chai';
import findMissingTranslations from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/find-missing-translations.js';

describe('lib | broccoli | translation-reducer | lint-translations | find-missing-translations', function () {
  it('key is an empty string', function () {
    const localeToKeys = {
      de: new Set(['some-key']),
      en: new Set(['some-key']),
    };

    const output = findMissingTranslations('', { localeToKeys });

    expect(output).to.deep.equal(['de', 'en']);
  });
});
