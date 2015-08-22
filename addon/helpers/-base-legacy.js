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

function helperFactory(formatType, optionalGetValue = getValue) {
    return function legacyIntlHelper(params, hash, options, env) {
        let outStream;

        function touchStream() {
            outStream.notify();
        }

        const seenHash = readHash(hash);
        const view = env.data.view;
        const intl = view.container.lookup('service:intl');
        const formatter = view.container.lookup(`ember-intl@formatter:format-${formatType}`);
        const currentValue = optionalGetValue(params, hash, intl);

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
