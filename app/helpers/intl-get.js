/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var helper;

if (Ember.HTMLBars) {
    helper = Ember.HTMLBars.makeBoundHelper(function (params/*, hash, options, env*/) {
        params = params || [];

        var intl = this.container.lookup('intl:main');

        Ember.assert('You must pass in a message key in the form of a string.', typeof params[0] === 'string');

        return intl.get('messages.' + params[0]);
    });
}
else {
    helper = function (value) {
        Ember.assert('You must pass in a message key in the form of a string.', typeof value === 'string');

        var intl = this.container.lookup('intl:main');

        return intl.get('messages.' + value);
    };
}

export default helper;