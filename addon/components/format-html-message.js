import IntlComponent from './format-message';
import escape from '../utils/escape';

function escapeProps (props) {
	return Object.keys(props).reduce(function (escapedProps, name) {
		var value = props[name];

		// TODO: Can we force string coersion here? Or would that not be needed
		// and possible mess with IntlMessageFormat?
		if (typeof value === 'string') {
			value = escape(value);
		}

		escapedProps[name] = value;
		return escapedProps;
	}, {});
}

var FormatHTMLMessageComponent = IntlComponent.extend({
	tagName:           'format-html-message',
	instrumentDisplay: '{{format-html-message}}',

	renderer: function (intl, props, options) {
		return intl.formatMessage(props.value, escapeProps(this.get('pojoContext')), options);
	}
});

export default FormatHTMLMessageComponent;
