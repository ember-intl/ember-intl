import Ember from "ember";
import FormatDate from 'ember-intl/formatters/format-date';
import FormatHtmlMessage from 'ember-intl/formatters/format-html-message';
import FormatMessage from 'ember-intl/formatters/format-message';
import FormatNumber from 'ember-intl/formatters/format-number';
import FormatRelative from 'ember-intl/formatters/format-relative';
import FormatTime from 'ember-intl/formatters/format-time';
import IntlService from '../../service/intl';

var callHelper;

// Helpers receive different arguments in HTMLBars that it used to receive in
// Handlebars.
// This function calls the helper with the proper arguments depending on
// the configured template engine.
if (Ember.HTMLBars) {
	callHelper = function(helper, args) {
		var container = new Ember.Container();

		var view = Ember.View.create({
			container: container
		});

		var helperFunction = helper.helperFunction || helper;

		container.register('intl:main', IntlService);
		container.injection('ember-intl@formatter', 'intl', 'intl:main');
		container.register('ember-intl@formatter:format-date', FormatDate);
		container.register('ember-intl@formatter:format-html-message', FormatHtmlMessage);
		container.register('ember-intl@formatter:format-message', FormatMessage);
		container.register('ember-intl@formatter:format-number', FormatNumber);
		container.register('ember-intl@formatter:format-relative', FormatRelative);
		container.register('ember-intl@formatter:format-time', FormatTime);

		return helperFunction.call(view, args.slice(0, -1), args[1], {}, { data: {} });
	};
} else {
	callHelper = function(helper, args) {
		return helper.apply(null, args);
	};
}

export default callHelper;