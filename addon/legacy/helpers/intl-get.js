/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import {
    Stream,
    read,
    readHash,
    destroyStream
} from 'ember-intl/utils/streams';

// Backwards compatibility for Ember < 1.13
export default function (value, options) {
    Ember.assert('intl-get helper must be used as a subexpression', options.isInline === true);

    let types = options.types;
    let view  = options.data.view;
    let hash  = readHash(options.hash);
    let intl  = view.container.lookup('service:intl');

    let currentValue = value;
    let outStreamValue = '';
    let valueStream;

    let outStream = new Stream(() => {
        return outStreamValue;
    });

    outStream.setValue = function (_value) {
        outStreamValue = _value;
        this.notify();
    };

    function valueStreamChanged () {
        currentValue = valueStream.value();
        pokeStream();
    }

    function pokeStream () {
        return Ember.RSVP.cast(intl.findTranslation(read(currentValue), hash.locale)).then(function (translation) {
            outStream.setValue(translation);
        });
    }

    if (types[0] === 'ID') {
        valueStream  = view.getStream(value);
        currentValue = valueStream.value();
        valueStream.subscribe(valueStreamChanged);
    }

    intl.on('localeChanged', this, pokeStream);

    view.one('willDestroyElement', this, () => {
        intl.off('localeChanged', this, pokeStream);

        if (valueStream) {
            valueStream.unsubscribe(valueStreamChanged);
        }

        destroyStream(outStream);
    });

    pokeStream();

    return outStream;
}
