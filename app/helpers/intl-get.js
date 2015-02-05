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

        var obj = intl.get(params[0]);

        if (obj === undefined) {
            throw new ReferenceError('Could not find Intl object: ' + path);
        }

        return obj;
    });
}
else {
    helper = function (value) {
        Ember.assert('You must pass in a message key in the form of a string.', typeof value === 'string');

        var intl = this.container.lookup('intl:main');

        var obj = intl.get(value);

        if (obj === undefined) {
            throw new ReferenceError('Could not find Intl object: ' + value);
        }

        return obj;
    };
}

export default helper;