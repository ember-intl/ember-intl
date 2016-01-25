import IntlRelativeFormat from 'intl-relativeformat';
import { module, test } from 'qunit';

module('Unit | MessageFormat exports');

test('intl-relativeformat exports a single module', function(assert) {
  assert.ok(IntlRelativeFormat, 'IntlRelativeFormat exports constructor');
});

test('intl-relativeformat exports a single module', function(assert) {
	var d = new Date();
	d.setDate(d.getDate() - 1);
  var rf = new IntlRelativeFormat('en-US');
  assert.equal(rf.format(d), 'yesterday');
});
