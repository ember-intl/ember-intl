/* {{formatMessage message
			product='Mac Mini'
			price='2000.0015'
			deadline=1390518044403}}

	Properties need to be assumed as user input
	and should be escaped.
*/
import IntlComponent from './main';
import escape from '../utils/escape';

var FormatHTMLMessageComponent = IntlComponent.extend({
	tagName:           'format-html-message',
	instrumentDisplay: '{{format-html-message}}',

	escapeProps: function (props) {
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
});

export default FormatHTMLMessageComponent;
