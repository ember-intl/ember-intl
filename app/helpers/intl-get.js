/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { Stream, read, readHash, destroyStream } from 'ember-intl/utils/streams';

function normalize (fullName) {
    Ember.assert('Lookup name must be a string', typeof fullName === 'string');
    return fullName.toLowerCase();
}

function intlGet (key, locale) {
    Ember.assert('You must pass in a message key in the form of a string.', typeof key === 'string');

    var intl    = this.container.lookup('intl:main');
    var locales = locale ? Ember.makeArray(locale) : intl.get('current');

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

export default function (value, options) {
    var view = options.data.view;
    var hash = readHash(options.hash);
    var intl = this.container.lookup('intl:main');
    var self = this;
    var currentValue;

    var outStream = new Stream(function () {
        return currentValue;
    });

    outStream.setValue = function(_value) {
        currentValue = _value;
        this.notify();
    }

    function pokeStream () {
        outStream.setValue(intlGet.call(self, read(value), hash.locales));
    }

    intl.on('localesChanged', this, pokeStream);

    view.one('willDestroyElement', this, function () {
        intl.off('localesChanged', this, pokeStream);
        destroyStream(outStream);
    });

    pokeStream();

    return outStream;
};
