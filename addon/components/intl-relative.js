import IntlComponent from './main';

var FormatRelativeComponent = IntlComponent.extend({
	tagName:           'intl-relative',
	instrumentDisplay: '{{intl-relative}}',

	renderer: function (intl, props, options) {
		return intl.formatRelative(props.value, options);
	}
});

FormatRelativeComponent.reopenClass({
	formatOptions: [
		'style', 'units'
	]
});

export default FormatRelativeComponent;
