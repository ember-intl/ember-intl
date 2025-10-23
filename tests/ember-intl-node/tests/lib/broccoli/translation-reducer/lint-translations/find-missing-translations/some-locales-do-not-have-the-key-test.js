import { expect } from 'chai';
import findMissingTranslations from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/find-missing-translations.js';

describe('lib | broccoli | translation-reducer | lint-translations | find-missing-translations', function () {
  it('some locales do not have the key', function () {
    const localeToKeys = {
      de: new Set(['some-key']),
      en: new Set(),
    };

    const output = findMissingTranslations('some-key', { localeToKeys });

    expect(output).to.deep.equal(['en']);
  });
});
