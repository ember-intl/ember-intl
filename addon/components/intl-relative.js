import IntlBase from './main';

var IntlRelative = IntlBase.extend({
	tagName:           'intl-relative',
	instrumentDisplay: '{{intl-relative}}',

	renderer: function (intl, inputValue, options) {
		return intl.formatRelative(inputValue, options);
	}
});

IntlRelative.reopenClass({
	formatOptions: [
		'style', 'units'
	]
});

export default IntlRelative;
