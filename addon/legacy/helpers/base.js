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
} from '../../utils/streams';

export default function (formatType, throwError) {
    return function (params, hash, seenHash, env) {
        if (!params || !params.length) {
            return throwError();
        }

        let outStream;

        function touchStream () {
            outStream.notify();
        }

        seenHash      = readHash(hash);

        let view      = env.data.view;
        let intl      = view.container.lookup('service:intl');
        let formatter = view.container.lookup('ember-intl@formatter:format-' + formatType);
        let value     = params[0];

        if (value.isStream) {
            value.subscribe(() => {
                touchStream();
            }, value);
        }

        outStream = new Stream(() => {
            let format = {};

            if (seenHash && seenHash.format) {
                format = intl.getFormat(formatType, seenHash.format);
            }

            return formatter.format.call(
                formatter,
                read(value),
                Ember.$.extend(Ember.getProperties(intl, 'locale'), format, seenHash)
            );
        });

        Ember.keys(hash).forEach((key) => {
            if (!hash[key].isStream) {
                return;
            }

            let hashStream = hash[key];
            hash[key] = read(hashStream);

            hashStream.subscribe(function (valueStream) {
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
