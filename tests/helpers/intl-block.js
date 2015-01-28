import Ember from 'ember';
import IntlService from '../../service/intl';
import FormatDate from 'ember-intl/formatters/format-date';
import formatDateHelper from '../../helpers/format-date';
import FormatTime from 'ember-intl/formatters/format-time';
import formatTimeHelper from '../../helpers/format-time';
import FormatRelative from 'ember-intl/formatters/format-relative';
import formatRelativeHelper from '../../helpers/format-relative';
import { runAppend, runDestroy } from '../helpers/run-append';

export default function (name, callbacks) {
	callbacks = callbacks || {};

	var container;

	QUnit.module(name, {
		setup: function () {
			Ember.lookup = this.lookup = { Ember: Ember };

			container = this.container = new Ember.Container();

			this.intlBlock = function (templateString, serviceContext, viewContext) {
				var service = this.service = IntlService.create(Ember.$.extend({
					container:      this.container,
					locales:        ['en'],
					defaultLocales: ['en']
				}, serviceContext || {}));

				container.register('intl:main', service, {
					singleton:   true,
					instantiate: false
				});

				container.injection('ember-intl@formatter', 'intl', 'intl:main');

				container.register('component-lookup:main', Ember.Object.extend({
					lookupFactory: function () { }
				}));

				return Ember.View.create({
					container: container,
					template:  Ember.HTMLBars.compile(templateString),
					context:   viewContext || {}
				});
			};

			if (callbacks.setup) {
				callbacks.setup(container)
			}
		},
		teardown: function () {
			runDestroy(container);

			if (callbacks.teardown) {
				callbacks.teardown(container)
			}
		}
	});
}
