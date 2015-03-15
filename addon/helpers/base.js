/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { Stream, read, readHash, destroyStream } from '../utils/streams';

var SimpleBoundView = Ember._SimpleHandlebarsView || Ember._SimpleBoundView;
var extend = Ember.$.extend;

export default function (formatterName) {
    function throwError () {
        return new Error(formatterName + ' requires a single unname argument. {{' + formatterName + ' value}}');
    }

    if (Ember.HTMLBars) {
        return function (params, hash, options, env) {
            if (!params || (params && !params.length)) {
                return throwError();
            }

            var currentValue, outStream;

            function touchStream () {
                outStream.notify();
            }

            var value     = params[0];
            var view      = env.data.view;
            var intl      = view.container.lookup('intl:main');
            var seenHash  = readHash(hash);
            var formatter = view.container.lookup('formatter:' + formatterName);

            if (value.isStream) {
                value.subscribe(function (_stream) {
                    currentValue = _stream.value();
                    touchStream();
                }, value);
            }

            currentValue = read(value);

            outStream = new Stream(function () {
                return formatter.format.call(formatter, read(currentValue), seenHash);
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
    } else {
        return function (value, options) {
            if (typeof value === 'undefined') {
                return throwError();
            }

            function touchStream () {
                simpleViewStream.notify();
                simpleView.rerender();
            }

            var view      = options.data.view;
            var intl      = this.container.lookup('intl:main');
            var types     = options.types;
            var hash      = extend({}, options.hash);
            var formatter = view.container.lookup('formatter:' + formatterName);

            var simpleView, simpleViewStream, currentValue;

            if (types[0] === 'ID') {
                value = view.getStream(value);
            }

            if (value.isStream && !options.data.isUnbound) {
                value.subscribe(function (valueStream) {
                    currentValue = valueStream.value();
                    touchStream();
                }, value);
            }

            currentValue = read(value);

            simpleViewStream = new Stream(function () {
                return formatter.format.call(formatter, read(currentValue), hash);
            });

            Ember.keys(options.hashTypes).forEach(function (key) {
                if (options.hashTypes[key] !== 'ID') {
                    return;
                }

                var hashStream = view.getStream(options.hash[key]);
                hash[key] = read(hashStream);

                if (!options.data.isUnbound) {
                    hashStream.subscribe(function (valueStream) {
                        hash[key] = read(valueStream);
                        touchStream();
                    });
                }
            });

            view.one('willDestroyElement', function () {
                destroyStream(simpleViewStream);
                intl.off('localesChanged', touchStream);
            });

            intl.on('localesChanged', touchStream);

            simpleView = new SimpleBoundView(simpleViewStream, options.escaped);
            view.appendChild(simpleView);
        };
    }
}
