import Ember from 'ember';
import createHelper from './helper-generator';

import FormatNumberComponent from './components/intl-number';
import FormatDateComponent from './components/intl-date';
import FormatTimeComponent from './components/intl-time';
import FormatMessageComponent from './components/intl-message';
import FormatHTMLMessageComponent from './components/intl-html-message';
import FormatRelativeComponent from './components/intl-relative';

/**
	Creates a handlebar helper for each of the intl components.
	@method nearestInstanceOf
	@param {Handlebars} handlebars object responsible for registering the helpers
*/
export function register (EmberHandlebars) {
	createHelper(EmberHandlebars, 'intlHtmlMessage', FormatHTMLMessageComponent);
	createHelper(EmberHandlebars, 'intlRelative',    FormatRelativeComponent);
	createHelper(EmberHandlebars, 'intlMessage',     FormatMessageComponent);
	createHelper(EmberHandlebars, 'intlNumber',      FormatNumberComponent);
	createHelper(EmberHandlebars, 'intlTime',        FormatTimeComponent);
	createHelper(EmberHandlebars, 'intlDate',        FormatDateComponent);
}

export default register;
