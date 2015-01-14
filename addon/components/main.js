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
	},

	layout: function (context, options) {
		var view    = options.data.view;
		var intl    = view.get('intl');
		var locales = view.get('locales');
		var props   = view.getProperties(view.propKeys);
		var formats = view.get('format') || view.constructor.filterFormatOptions(props);
		props.value = context.get('value');

		return view.renderer.call(view, props, {
			locales: locales,
			formats: formats
		});
	}
});

IntlComponent.reopenClass({
	formatOptions: Ember.A(),

	filterFormatOptions: function (obj) {
		var match = false;

		var options = this.formatOptions.reduce(function (opts, name) {
			if (obj.hasOwnProperty(name)) {
				match = true;
				opts[name] = obj[name];
			}

			return opts;
		}, {});

		if (match) {
			return options;
		}
	}
});

export default IntlComponent;
