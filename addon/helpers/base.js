/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { Stream, read, readHash, destroyStream } from '../utils/streams';

var getProperties = Ember.getProperties;

export default function (formatType) {
    function throwError () {
        return new Error(formatType + ' requires a single unname argument. {{format-' + formatType + ' value}}');
    }

    return function (params, hash, seenHash, env) {
        if (!params || (params && !params.length)) {
            return throwError();
        }

        var outStream;

        function touchStream () {
            outStream.notify();
        }

        seenHash      = readHash(hash);

        var view      = env.data.view;
        var intl      = view.container.lookup('service:intl');
        var formatter = view.container.lookup('ember-intl@formatter:format-' + formatType);
        var value     = params[0];

        if (value.isStream) {
            value.subscribe(function () {
                touchStream();
            }, value);
        }

        outStream = new Stream(function () {
            var format = {};

            if (seenHash && seenHash.format) {
                format = intl.getFormat(formatType, seenHash.format);
            }

            return formatter.format.call(
                formatter,
                read(value),
                Ember.$.extend(getProperties(intl, 'locales'), format, seenHash)
            );
        });

        Ember.keys(hash).forEach(function (key) {
            if (!hash[key].isStream) {
                return;
            }

            var hashStream = hash[key];
            hash[key] = read(hashStream);

            hashStream.subscribe(function (valueStream) {
                seenHash[key] = read(valueStream);
                touchStream();
            });
        });

        view.one('willDestroyElement', function () {
            destroyStream(outStream);
        });

        intl.on('localesChanged', touchStream);

        return outStream;
    };
}
