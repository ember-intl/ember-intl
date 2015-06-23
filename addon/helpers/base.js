/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import legacyBase from '../legacy/helpers/base';

var extend = Ember.$.extend;

export default function (formatType) {
    function throwError () {
        return new Error(`${formatType} requires a single value. {{format-${formatType} value}}`);
    }

    if (Ember.Helper) {
        return Ember.Helper.extend({
            intl: Ember.inject.service(),

            init() {
                this._super.apply(this, arguments);
                this.formatter = this.container.lookup(`ember-intl@formatter:format-${formatType}`);
            },

            onIntlLocaleChanged: Ember.observer('intl.locale', function() {
                this.recompute();
            }),

            compute(params, hash) {
                if (!params || !params.length) {
                    return throwError();
                }

                let format = {};
                let value = params[0];
                let intl = Ember.get(this, 'intl');

                if (hash && hash.format) {
                    format = intl.getFormat(formatType, hash.format);
                }

                return this.formatter.format(
                    value,
                    extend(Ember.getProperties(intl, 'locale'), format, hash)
                );
            }
        });
    }

    // Backwards compatibility for < 1.13
    return legacyBase(formatType, throwError);
}
