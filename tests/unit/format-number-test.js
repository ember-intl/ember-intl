import formatNumber from '../../helpers/format-number';
import IntlService from '../../service/intl';
import invoke from '../helpers/call-helper';

module('format-number');

test('FormatNumber exists', function() {
	expect(1);
	ok(formatNumber);
});

test('Number is formatted correctly', function() {
	expect(1);

	var result = invoke(formatNumber, [1000, {}]);
	equal(result, "1,000");
});

test('Number is formatted correctly with locale argument', function() {
	expect(1);

	var result = invoke(formatNumber, [1000, {
		locales: ['fr-FR']
	}]);

	// non-breaking space so we can't just compare "1 000" to "1 000"
	// since it's not a %20 space character
	equal(escape(result), "1%A0000");
});
