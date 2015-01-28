/**
* Copyright 2014, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

import Ember from 'ember';

export default function (formatterName) {
	if (Ember.HTMLBars) {
		return Ember.HTMLBars.makeBoundHelper(function (params, hash, options, env) {
			var formatter = this.container.lookup('ember-intl@formatter:' + formatterName);

			formatter.intl.one('localesChanged', this, function () {
				Ember.run.once(this, this.rerender);
			});

			var args = [];

			if (typeof params[0] !== 'undefined') {
				args.push(params[0]);
			} else {
				return new Error(formatterName + ' requires a single unname argument. {{' + formatterName + ' value}}');
			}

			args.push(hash);
			args.push(Ember.get(env, 'data.view.context'));

			return formatter.format.apply(formatter, args);
		});
	} else {
		return Ember.Handlebars.makeBoundHelper(function (value, options) {
			var formatter = this.container.lookup('ember-intl@formatter:' + formatterName);

			formatter.intl.one('localesChanged', this, function () {
				Ember.run.once(this, this.rerender);
			});

			var args = [];

			if (typeof value !== 'undefined') {
				args.push(value);
			} else {
				return new Error(formatterName + ' requires a single unname argument. {{' + formatterName + ' value}}');
			}

			args.push(options.hash);
			args.push(options.contexts[0]);

			return formatter.format.apply(formatter, args);
		});
	}
}
