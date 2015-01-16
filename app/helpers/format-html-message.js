import helperBase from 'ember-intl/helpers/base';
import { extractICUKeys, formatOptions } from './format-message';

var get      = Ember.get;
var validKey = /[\w|.]/;

function escapeProps (props) {
	return Object.keys(props).reduce(function (escapedProps, name) {
		var value = props[name];

		// TODO: Can we force string coersion here? Or would that not be needed
		// and possible mess with IntlMessageFormat?
		if (typeof value === 'string') {
			value = Ember.Handlebars.Utils.escapeExpression(value);
		}

		escapedProps[name] = value;
		return escapedProps;
	}, {});
}

export default helperBase(formatOptions, function (intl, inputValue, options, hash) {
	var icuKeys      = extractICUKeys(inputValue);
	var contextProps = get(this, 'context').getProperties(icuKeys);
	var messageModel = Ember.$.extend(contextProps, hash);

	return Ember.String.htmlSafe(intl.formatMessage(inputValue, escapeProps(messageModel), options));
}, false);