import formatNumber from '../../helpers/format-number';
import IntlService from 'ember-intl/service/intl';
import { moduleFor } from 'ember-qunit';

moduleFor('helper:format-number', '' , {
	setup: function () {
		this.container.register('intl:main', IntlService.create({
			locales: ['en']
		}));
	}
});

test('exists', function() {
	expect(1);
	ok(formatNumber);
});

test('number is formatted', function() {
	expect(1);
	ok(formatNumber);
});
