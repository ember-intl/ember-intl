import IntlComponent from './main';

var FormatRelativeComponent = IntlComponent.extend({
	tagName:           'format-relative',
	instrumentDisplay: '{{format-relative}}',

	renderer: function (props, options) {
		return this.get('intl').formatRelative(props.value, options);
	}
});

FormatRelativeComponent.reopenClass({
	formatOptions: [
		'style', 'units'
	]
});

export default FormatRelativeComponent;
