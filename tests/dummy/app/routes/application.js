import Ember from 'ember';

export default Ember.Route.extend({
	intl: Ember.inject.service(),

	beforeModel() {
		Ember.set(this, 'intl.locale', 'en-US');
	}
});
