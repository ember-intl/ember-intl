/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

function intlGet (key, container) {
    var intl = container.lookup('intl:main');

    Ember.assert('You must pass in a message key in the form of a string.', typeof key === 'string');
    
    // current is an array of locales 
    // (usually "active" and the defaultLocale at the tail of the array)
    var locales = intl.get('current');
    
    for (var i=0; i<locales.length; i++) {
        var locale = container.lookup('locale:' + locales[i]);
        if (locale) {
            return locale.intlGetAccessor(key);
        }
    }
    
    throw new ReferenceError('Could not find Intl object: ' + key);
}

var helper;

if (Ember.HTMLBars) {
    helper = Ember.HTMLBars.makeBoundHelper(function (params) {
        params = params || [];
        
        return intlGet(params[0], this.container);
    });
}
else {
    helper = function (value) {
        Ember.assert('You must pass in a message key in the form of a string.', typeof value === 'string');

        return intlGet(value, this.container);
    };
}

export default helper;
