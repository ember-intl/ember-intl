import { expect } from 'chai';
import stripEmptyTranslations from 'ember-intl/lib/broccoli/translation-reducer/utils/strip-empty-translations.js';

describe('stripEmptyTranslations', function () {
  [
    [{ a: true, b: null }, { a: true }],
    [{ a: { b: null } }, {}],
    [{ a: { b: null, c: '' }, d: '' }, {}],
    [
      { a: true, b: { c: true, d: { e: null, f: true } } },
      { a: true, b: { c: true, d: { f: true } } },
    ],
  ].forEach(([object, expected]) => {
    it(`${JSON.stringify(object)} -> ${JSON.stringify(expected)}`, function () {
      expect(stripEmptyTranslations(object)).to.deep.equal(expected);
    });
  });
});
