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

function intlGet (key, locale, container) {
    Ember.assert('You must pass in a message key in the form of a string.', typeof key === 'string');

    var intl    = container.lookup('intl:main');
    var locales = locale ? Ember.makeArray(locale) : intl.get('current');

    for (var i=0; i < locales.length; i++) {
        var locale = container.lookup('locale:' + normalize(locales[i]));

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
    var view  = options.data.view;
    var types = options.types;
    var hash  = readHash(options.hash);
    var intl  = view.container.lookup('intl:main');

    var currentValue = value;
    var valueStream, outStreamValue;

    var outStream = new Stream(function () {
        return outStreamValue;
    });

    outStream.setValue = function(_value) {
        outStreamValue = _value;
        this.notify();
    }

    function valueStreamChanged () {
        currentValue = valueStream.value();
        pokeStream();
    }

    function pokeStream () {
        outStream.setValue(intlGet(read(currentValue), hash.locales, view.container));
    }

    if (types[0] === 'ID') {
        valueStream  = view.getStream(value);
        currentValue = valueStream.value();
        valueStream.subscribe(valueStreamChanged);
    }

    intl.on('localesChanged', this, pokeStream);

    view.one('willDestroyElement', this, function () {
        intl.off('localesChanged', this, pokeStream);

        if (valueStream) {
            valueStream.unsubscribe(valueStreamChanged);
        }

        destroyStream(outStream);
    });

    pokeStream();

    return outStream;
};
