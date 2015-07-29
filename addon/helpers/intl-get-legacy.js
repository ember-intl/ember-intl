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
} from '../utils/streams';

const { RSVP, assert } = Ember;

// Backwards compatibility for Ember < 1.13
export default function (value, options) {
    assert('intl-get helper must be used as a subexpression', options.isInline === true);

    const types = options.types;
    const view = options.data.view;
    const hash = readHash(options.hash);
    const intl = view.container.lookup('service:intl');

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
        return RSVP.cast(intl.findTranslationByKey(read(currentValue), hash.locale)).then((translation) => {
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
