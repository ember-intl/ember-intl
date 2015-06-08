import Ember from 'ember';

export default Ember.Route.extend({
	intl: Ember.inject.service(),

	beforeModel: function() {
		this.get('intl').setProperties({
				locales:       ['en-US'],
				defaultLocale: 'en-US'
		});
	}
});
