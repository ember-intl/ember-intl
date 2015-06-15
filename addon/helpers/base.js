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

    return Ember.Helper.extend({
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
}
