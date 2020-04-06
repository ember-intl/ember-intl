const expect = require('chai').expect;
const stripNestedNulls = require('../../../../lib/broccoli/translation-reducer/utils/strip-nested-nulls');

describe('stripNestedNulls', function () {
  [
    [{ a: true, b: null }, { a: true }],
    [{ a: { b: null } }, { a: {} }],
    [
      { a: { b: null, c: '' }, d: '' },
      { a: { c: '' }, d: '' },
    ],
    [
      { a: true, b: { c: true, d: { e: null, f: true } } },
      { a: true, b: { c: true, d: { f: true } } },
    ],
  ].forEach(([object, expected]) => {
    it(`${JSON.stringify(object)} -> ${JSON.stringify(expected)}`, function () {
      expect(stripNestedNulls(object)).to.deep.equal(expected);
    });
  });
});
