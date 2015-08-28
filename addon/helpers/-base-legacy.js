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

function helperFactory(formatType, optionalGetValue, optionalValidator) {
    if (typeof optionalGetValue !== 'function') {
        optionalGetValue = getValue;
    }

    return function legacyIntlHelper(params, hash, options, env) {
        let outStream;

        function touchStream() {
            outStream.notify();
        }

        let seenHash = readHash(hash);
        let view = env.data.view;
        let intl = view.container.lookup('service:intl');
        let formatter = view.container.lookup(`ember-intl@formatter:format-${formatType}`);
        let currentValue = optionalGetValue(params, hash, intl);
        let isValidValue = true;

        if (optionalValidator) {
            isValidValue = optionalValidator(currentValue, hash);

            if (!isValidValue) {
                return;
            }
        }

        if (typeof currentValue === 'undefined') {
            throw new Error(`format-${formatType} helper requires value`);
        }

        if (currentValue.isStream) {
            currentValue.subscribe(() => {
                touchStream();
            }, currentValue);
        }

        outStream = new Stream(() => {
            let format = {};

            if (seenHash && seenHash.format) {
                format = intl.getFormat(formatType, seenHash.format);
            }

            return formatter.format.call(
                formatter,
                read(currentValue),
                extend({
                    locale: get(intl, '_locale')
                }, format, seenHash),
                get(intl, 'formats')
            );
        });

        Object.keys(hash).forEach((key) => {
            const value = hash[key];

            if (!value || !value.isStream) {
                return;
            }

            hash[key] = read(value);

            value.subscribe((currentValueStream) => {
                seenHash[key] = read(currentValueStream);
                touchStream();
            });
        });

        view.one('willDestroyElement', () => {
            intl.off('localeChanged', view, touchStream);
            destroyStream(outStream);
        });

        intl.on('localeChanged', view, touchStream);

        return outStream;
    };
}

export default helperFactory;
