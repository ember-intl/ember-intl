import Ember from 'ember';

var bindingRegex = new RegExp(/Binding$/);

var IntlComponent = Ember.Component.extend({
	propKeys:  Ember.A(),
	value:     null,

	locales: Ember.computed.oneWay('intl.locales'),

	intl: Ember.computed(function () {
		return this.container.lookup('intl:main');
	}).readOnly(),

	setupPropObservers: Ember.on('init', function () {
		this.propKeys.forEach(this.createIntlObservers, this);
	}),

	scheduleRender: Ember.observer('locales', function () {
		Ember.run.once(this, this.rerender);
	}),

	destroy: function () {
		this.propKeys.forEach(this.removeIntlObservers, this);

		return this._super.apply(this, arguments);
	},

	createIntlObservers: function (propertyName) {
		if (bindingRegex.test(propertyName) || this.get(propertyName + 'Binding')) {
			this.addObserver(propertyName.replace(bindingRegex, ''), this, this.scheduleRender);
		}
	},

	removeIntlObservers: function (propertyName) {
		if (bindingRegex.test(propertyName) || this.get(propertyName + 'Binding')) {
			this.removeObserver(propertyName, this, this.scheduleRender);
		}
	}
});

IntlComponent.reopenClass({
	formatOptions: Ember.A(),

	filterFormatOptions: function (obj) {
		return (this.formatOptions || Ember.A()).reduce(function (opts, name) {
			if (obj.hasOwnProperty(name)) {
				opts[name] = obj[name];
			}

			return opts;
		}, {});
	}
});

export default IntlComponent;
