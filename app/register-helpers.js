import Ember from 'ember';
import createHelper from './helper-generator';

import FormatNumberComponent from './components/format-number';
import FormatDateComponent from './components/format-date';
import FormatTimeComponent from './components/format-time';
import FormatMessageComponent from './components/format-message';
import FormatHTMLMessageComponent from './components/format-html-message';
import FormatRelativeComponent from './components/format-relative';

/**
	Creates a handlebar helper for each of the intl components.
	@method nearestInstanceOf
	@param {Handlebars} handlebars object responsible for registering the helpers
*/
export function register (EmberHandlebars) {
	createHelper(EmberHandlebars, 'formatHtmlMessage', FormatHTMLMessageComponent);
	createHelper(EmberHandlebars, 'formatRelative',    FormatRelativeComponent);
	createHelper(EmberHandlebars, 'formatMessage',     FormatMessageComponent);
	createHelper(EmberHandlebars, 'formatNumber',      FormatNumberComponent);
	createHelper(EmberHandlebars, 'formatTime',        FormatTimeComponent);
	createHelper(EmberHandlebars, 'formatDate',        FormatDateComponent);
}

export default register;