import memoizer from 'intl-format-cache';
import { module, test } from 'qunit';

module('Unit | Format Cache exports');

test('intl-format-cache exports', function(assert) {
  assert.ok(memoizer, 'IntlFormatCache exists');
});

test('intl-format-cache exports a factory method', function(assert) {
  assert.equal(typeof memoizer, 'function', 'IntlFormatCache is a function');
});
