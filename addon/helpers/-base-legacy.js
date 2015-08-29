/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import extend from '../utils/extend';

import {
    Stream,
    read,
    readHash,
    destroyStream
} from 'ember-intl/utils/streams';

const { get } = Ember;

function getValue(params) {
    return params[0];
}

function helperFactory(formatType, optionalGetValue, optionalReturnEmpty) {
    if (typeof optionalGetValue !== 'function') {
        optionalGetValue = getValue;
    }

    return function legacyIntlHelper(params, hash, options, env) {
        let view = env.data.view;
        let intl = view.container.lookup('service:intl');
        let formatter = view.container.lookup(`ember-intl@formatter:format-${formatType}`);
        let value = optionalGetValue(params, hash, intl);

        if (typeof value === 'undefined') {
            throw new Error(`format-${formatType} helper requires value`);
        }

        let out = new Stream(() => {
            let seenHash = readHash(hash);
            let seenValue = read(value);
            let format = {};

            if (optionalReturnEmpty && optionalReturnEmpty(seenValue, seenHash)) {
                return;
            }

            if (seenHash && seenHash.format) {
                format = intl.getFormat(formatType, seenHash.format);
            }

            return formatter.format.call(
                formatter,
                seenValue,
                extend({
                    locale: get(intl, '_locale')
                }, format, seenHash),
                get(intl, 'formats')
            );
        });

        function notify() {
            if (out) {
                out.notify();
            }
        }

        Object.keys(hash).forEach(function(key) {
            const value = hash[key];

            if (value && value.isStream) {
                value.subscribe(notify, out);
            }
        });

        if (value.isStream) {
            value.subscribe(notify, out);
        }

        view.one('willDestroyElement', () => {
            intl.off('localeChanged', view, notify);
            destroyStream(out);
        });

        intl.on('localeChanged', view, notify);

        return out;
    };
}

export default helperFactory;
