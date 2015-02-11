/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { Stream, read, destroyStream } from 'ember-intl/utils/streams';

function normalize (fullName) {
    Ember.assert('Lookup name must be a string', typeof fullName === 'string');
    return fullName.toLowerCase();
}

function intlGet (key) {
    Ember.assert('You must pass in a message key in the form of a string.', typeof key === 'string');

    var intl    = this.container.lookup('intl:main');
    var locales = intl.get('current');

    for (var i=0; i < locales.length; i++) {
        var locale = this.container.lookup('locale:' + normalize(locales[i]));

        if (locale) {
            var value = locale.getValue(key);

            if (typeof value !== 'undefined') {
                return value;
            }
        }
    }

    throw new ReferenceError('Could not find Intl object: ' + key);
}

var helper;

if (Ember.HTMLBars) {
    helper = Ember.HTMLBars.makeBoundHelper(function (params) {
        var intl = this.container.lookup('intl:main');
        var self = this;
        var currentValue;

        var outStream = new Stream(function () {
            return currentValue;
        });

        function render () {
            currentValue = intlGet.call(self, read(params[0]));
            outStream.notify();
        }

        intl.on('localesChanged', self, render);
        
        this.on('willDestroyElement', this, function () {
            intl.off('localesChanged', self, render);
            destroyStream(outStream);
        });

        render();

        return outStream;
    });
}
else {
    helper = function (value) {
        return intlGet.call(this, value);
    };
}

export default helper;
