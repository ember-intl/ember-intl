/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import extend from '../utils/extend';

const { observer } = Ember;

export default function (formatType) {
    function throwError () {
        return new Error(`${formatType} requires a single unname argument. {{format-${formatType} value}}`);
    }

    return Ember.Helper.extend({
        intl: Ember.inject.service(),

        init() {
            this._super.apply(this, arguments);
            this.formatter = this.container.lookup(`ember-intl@formatter:format-${formatType}`);
        },

        onIntlLocaleChanged: observer('intl.locale', function() {
            this.recompute();
        }),

        compute(params, hash) {
            if (!params || !params.length) {
                return throwError();
            }

            let format = {};
            let value  = params[0];
            let intl   = Ember.get(this, 'intl');

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
