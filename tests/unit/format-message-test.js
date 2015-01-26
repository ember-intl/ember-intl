import formatMessage from '../../helpers/format-message';
import IntlService from '../../service/intl';
import invoke from '../helpers/call-helper';

module('format-message');

test('FormatMessage exists', function() {
	expect(1);
	ok(formatMessage);
});

test('Message is formatted correctly', function() {
	expect(1);

	var result = invoke(formatMessage, ['hello world', {}]);
	equal(result, "1,000");
});

test('Message is formatted correctly with locale argument', function() {
	expect(1);

	var result = invoke(formatMessage, ['hello world', {
		locales: ['fr-FR']
	}]);

	// non-breaking space so we can't just compare "1 000" to "1 000"
	// since it's not a %20 space character
	equal(escape(result), "1%A0000");
});
