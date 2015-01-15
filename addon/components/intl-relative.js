import IntlBase from './main';

var IntlRelative = IntlBase.extend({
	tagName:           'intl-relative',
	instrumentDisplay: '{{intl-relative}}',

	renderer: function (intl, props, options) {
		return intl.formatRelative(props.value, options);
	}
});

IntlRelative.reopenClass({
	formatOptions: [
		'style', 'units'
	]
});

export default IntlRelative;
