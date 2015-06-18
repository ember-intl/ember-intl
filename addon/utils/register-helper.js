import Ember from 'ember';

function registerHelper (name, klass, container) {
    if (!Ember.Helper) {
        return Ember.HTMLBars._registerHelper(name, klass);
    }

    return container.register(`helper:${name}`, klass);
}

export default registerHelper;
