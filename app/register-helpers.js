import Ember from 'ember';
import createHelper from './helper-generator';

import FormatNumberComponent from 'ember-intl/components/intl-number';
import FormatDateComponent from 'ember-intl/components/intl-date';
import FormatTimeComponent from 'ember-intl/components/intl-time';
import FormatMessageComponent from 'ember-intl/components/intl-message';
import FormatHTMLMessageComponent from 'ember-intl/components/intl-html-message';
import FormatRelativeComponent from 'ember-intl/components/intl-relative';

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
