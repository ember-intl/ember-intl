import Ember from 'ember';

export default function (formatterName) {
	return Ember.HTMLBars.makeBoundHelper(function (params, hash, options, env) {
		var formatter = this.container.lookup('ember-intl@formatter:' + formatterName);

		formatter.intl.one('localesChanged', this, function () {
			Ember.run.once(this, this.rerender);
		});

		return formatter.render.apply(formatter, arguments);
	});
}
