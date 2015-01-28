import Ember from 'ember';

function runAppend (view) {
	Ember.run(view, "appendTo", "#qunit-fixture");
}

function runDestroy (destroyed) {
	if (destroyed) {
		Ember.run(destroyed, "destroy");
	}
}

export {
	runAppend,
	runDestroy
};