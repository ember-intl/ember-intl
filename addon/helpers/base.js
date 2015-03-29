/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { Stream, read, readHash, destroyStream } from '../utils/streams';

export default function (formatterName) {
    function throwError () {
        return new Error(formatterName + ' requires a single unname argument. {{' + formatterName + ' value}}');
    }

    return function (params, hash, options, env) {
        if (!params || (params && !params.length)) {
            return throwError();
        }

        var outStream;

        function touchStream () {
            outStream.notify();
        }

        var value     = params[0];
        var view      = env.data.view;
        var intl      = view.container.lookup('service:intl');
        var seenHash  = readHash(hash);
        var formatter = view.container.lookup('ember-intl@formatter:' + formatterName);

        if (value.isStream) {
            value.subscribe(function () {
                touchStream();
            }, value);
        }

        outStream = new Stream(function () {
            return formatter.format.call(formatter, read(value), seenHash);
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
