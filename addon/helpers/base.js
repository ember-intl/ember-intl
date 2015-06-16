/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { Stream, read, readHash, destroyStream } from '../utils/streams';

let getProperties = Ember.getProperties;

export default function (formatType) {
    function throwError () {
        return new Error(formatType + ' requires a single unname argument. {{format-' + formatType + ' value}}');
    }

    var Helper = null;

    if( Ember.Helper ) {
        // Helper for Ember >= 1.13
        Helper =  Ember.Helper.extend({
            intl: Ember.inject.service(),

            init() {
                this.set('formatter', this.container.lookup('ember-intl@formatter:format-' + formatType));
            },

            onIntlLocaleChanged: Ember.observer('intl.locale', function() {
                this.recompute();
            }),

            compute(params, hash) {
                if( !params || (params && !params.length)) {
                    return throwError();
                }

                let format = {};
                let value = params[0];

                if( hash && hash.format ) {
                    format = this.get('intl').getFormat(formatType, hash.format);
                }

                return this.get('formatter').format.call(
                    this.get('formatter'),
                    value,
                    Ember.$.extend(getProperties(this.get('intl'), 'locale'), format, hash)
                );
            }
        });
    } else {
        // Backwards compatibility for < 1.13
        Helper = function (params, hash, seenHash, env) {
            if (!params || (params && !params.length)) {
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
                    Ember.$.extend(getProperties(intl, 'locale'), format, seenHash)
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

    return Helper;
}
