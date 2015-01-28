import Ember from 'ember';
import IntlService from '../../service/intl';
import FormatNumber from 'ember-intl/formatters/format-number';
import formatNumberHelper from '../../helpers/format-number';
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