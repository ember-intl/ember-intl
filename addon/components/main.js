import Ember from 'ember';

var bindingExp = new RegExp(/Binding$/);
var computed   = Ember.computed;

var IntlBase = Ember.Component.extend({
	tagName:   '',
	value:     null,
	propKeys:  Ember.A(),
	locales:   computed.oneWay('intl.locales'),

	setup: Ember.on('init', function () {
		Ember.defineProperty(this, 'intl', computed(function () {
			return this.container.lookup('intl:main');
		}).readOnly());

		Ember.defineProperty(this, 'boundKeys', computed('propKeys.[]', function () {
			return this.get('propKeys').filter(function (key) {
				return bindingExp.test(key) || this.get(key + 'Binding');
			}.bind(this));
		}).readOnly());

		this.get('boundKeys').forEach(this._createObserver, this);
	}),

	scheduleRender: Ember.observer('locales', function () {
		Ember.run.once(this, this.rerender);
	}),

	destroy: function () {
		this.get('boundKeys').forEach(this._removeObserver, this);
		return this._super.apply(this, arguments);
	},

	_createObserver: function (propertyName) {
		this.addObserver(propertyName.replace(bindingExp, ''), this, this.scheduleRender);
	},

	_removeObserver: function (propertyName) {
		this.removeObserver(propertyName, this, this.scheduleRender);
	},

	layout: function (context, options) {
		var view    = options.data.view;
		var intl    = view.get('intl');
		var locales = view.get('locales');
		var props   = view.getProperties(view.propKeys);
		var formats = view.get('format') || view.constructor.filterFormatOptions(props);

		return view.renderer.call(view, intl, context.get('value'), {
			locales: locales,
			formats: formats
		});
	}
});

IntlBase.reopenClass({
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

export default IntlBase;
