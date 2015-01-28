import Ember from 'ember';
import IntlService from '../../service/intl';

import FormatNumber from 'ember-intl/formatters/format-number';
import formatNumberHelper from '../../helpers/format-number';

import FormatDate from 'ember-intl/formatters/format-date';
import formatDateHelper from '../../helpers/format-date';

import FormatTime from 'ember-intl/formatters/format-time';
import formatTimeHelper from '../../helpers/format-time';

import FormatRelative from 'ember-intl/formatters/format-relative';
import formatRelativeHelper from '../../helpers/format-relative';

import { runAppend, runDestroy } from '../helpers/run-append';

export default function () {
	var view, container;

	return {
		setup: function () {
			Ember.lookup = this.lookup = { Ember: Ember };

			container = this.container = new Ember.Container();

			var service = this.service = IntlService.create({
				container:      this.container,
				locales:        ['en'],
				defaultLocales: ['en']
			});

			this.intlBlock = function (templateString) {
				container.register('intl:main', service, {
					singleton:   true,
					instantiate: false
				});

				container.injection('ember-intl@formatter', 'intl', 'intl:main');
				container.register('ember-intl@formatter:format-number', FormatNumber);
				container.register('helper:format-number', formatNumberHelper, { instantiate: false });

				container.register('ember-intl@formatter:format-date', FormatDate);
				container.register('helper:format-date', formatDateHelper, { instantiate: false });

				container.register('ember-intl@formatter:format-time', FormatTime);
				container.register('helper:format-time', formatTimeHelper, { instantiate: false });

				container.register('ember-intl@formatter:format-relative', FormatRelative);
				container.register('helper:format-relative', formatRelativeHelper, { instantiate: false });

				container.register('component-lookup:main', Ember.Object.extend({
					lookupFactory: function () { }
				}));

				view = this.view = Ember.View.create({
					container: container,
					template:  Ember.HTMLBars.compile(templateString)
				});

				return view;
			};
		},
		teardown: function () {
			runDestroy(view);
			runDestroy(container);
		}
	};
}