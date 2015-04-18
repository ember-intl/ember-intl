/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { Stream, read, readHash, destroyStream } from 'ember-intl/utils/streams';

export default function (value, options) {
    Ember.assert('intl-get helper must be used as a subexpression', options.isInline === true);

    var view  = options.data.view;
    var types = options.types;
    var hash  = readHash(options.hash);
    var intl  = view.container.lookup('service:intl');

    var currentValue = value;
    var outStreamValue = '';
    var valueStream;

    var outStream = new Stream(function () {
        return outStreamValue;
    });

    outStream.setValue = function (_value) {
        outStreamValue = _value;
        this.notify();
    }

    function valueStreamChanged () {
        currentValue = valueStream.value();
        pokeStream();
    }

    function pokeStream () {
        return intl.getTranslation(read(currentValue), hash.locales).then(function (translation) {
            outStream.setValue(translation);
        });
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
