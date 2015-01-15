import IntlComponent from './main';

var FormatRelativeComponent = IntlComponent.extend({
	tagName:           'format-relative',
	instrumentDisplay: '{{format-relative}}',

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
