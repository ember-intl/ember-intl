import messageFormatParser from 'intl-messageformat-parser';
import { module, test } from 'qunit';

module('Unit | MessageFormatParser exports');

test('intl-messageformat-parser exports a single module', function(assert) {
  assert.ok(messageFormatParser, 'messageformat-parser is exported');
});

test('intl-messageformat-parser contains a parse method', function(assert) {
  assert.equal(typeof messageFormatParser.parse, 'function');
});
