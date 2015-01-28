import formatMessage from '../../helpers/format-message';
import IntlService from '../../service/intl';
import callHelper from '../helpers/call-helper';

module('format-message');

test('FormatMessage exists', function() {
	expect(1);

	ok(formatMessage);
});

test('Message is formatted correctly', function() {
	expect(1);

	var result = callHelper(formatMessage, ['hello world']);
	equal(result, "hello world");
});

test('Message is formatted correctly with locale argument', function() {
	expect(1);

	var result = callHelper(formatMessage, ['hello world', {
		locales: ['en']
	}]);

	// non-breaking space so we can't just compare "1 000" to "1 000"
	// since it's not a %20 space character
	equal(result, "hello world");
});

test('ICU Message is formatted correctly with locale argument', function() {
	expect(1);

	var result = callHelper(formatMessage, ['Hello {name}', {
		name: 'Jason'
	}]);

	// non-breaking space so we can't just compare "1 000" to "1 000"
	// since it's not a %20 space character
	equal(result, "Hello Jason");
});
