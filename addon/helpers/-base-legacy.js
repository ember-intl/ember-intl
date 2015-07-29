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

export default function (formatType) {
    function throwError () {
        return new Error(`${formatType} requires a single unname argument. {{format-${formatType} value}}`);
    }

    return function (params, hash, seenHash, env) {
        if (!params || !params.length) {
            return throwError();
        }

        let outStream;

        function touchStream () {
            outStream.notify();
        }

        seenHash = readHash(hash);

        const view = env.data.view;
        const intl = view.container.lookup('service:intl');
        const formatter = view.container.lookup(`ember-intl@formatter:format-${formatType}`);
        const value = params[0];

        if (value.isStream) {
            value.subscribe(() => {
                touchStream();
            }, value);
        }

        outStream = new Stream(() => {
            let format = {};

            if (seenHash && seenHash.format) {
                format = intl.getFormat(formatType, seenHash.format) || {};
            }

            return formatter.format.call(
                formatter,
                read(value),
                extend(Ember.getProperties(intl, 'locale'), format, seenHash),
                Ember.get(intl, 'formats')
            );
        });

        Object.keys(hash).forEach((key) => {
            if (!hash[key].isStream) {
                return;
            }

            const hashStream = hash[key];
            hash[key] = read(hashStream);

            hashStream.subscribe((valueStream) => {
                seenHash[key] = read(valueStream);
                touchStream();
            });
        });

        view.one('willDestroyElement', () => {
            destroyStream(outStream);
        });

        intl.on('localeChanged', touchStream);

        return outStream;
    };
}
