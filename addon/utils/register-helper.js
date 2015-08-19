/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

function registerHelper(name, klass, registry) {
    if (!Ember.Helper) {
        return Ember.HTMLBars._registerHelper(name, klass);
    }

    return registry.register(`helper:${name}`, klass);
}

export default registerHelper;
