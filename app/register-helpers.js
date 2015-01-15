import Ember from 'ember';
import createHelper from './helper-generator';

import IntlHTMLMessage from 'ember-intl/components/intl-html-message';
import IntlRelative from 'ember-intl/components/intl-relative';
import IntlMessage from 'ember-intl/components/intl-message';
import IntlNumber from 'ember-intl/components/intl-number';
import IntlTime from 'ember-intl/components/intl-time';
import IntlDate from 'ember-intl/components/intl-date';

/**
	Creates a handlebar helper for each of the intl components.
	@method register
	@param {EmberHandlebars} Ember Handlebars object
*/
export function register (EmberHandlebars) {
	createHelper(EmberHandlebars, 'intl-html-message', IntlHTMLMessage);
	createHelper(EmberHandlebars, 'intl-relative',     IntlRelative);
	createHelper(EmberHandlebars, 'intl-message',      IntlMessage);
	createHelper(EmberHandlebars, 'intl-number',       IntlNumber);
	createHelper(EmberHandlebars, 'intl-time',         IntlTime);
	createHelper(EmberHandlebars, 'intl-date',         IntlDate);
}

export default register;
