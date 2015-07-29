/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import extend from '../utils/extend';

const { get } = Ember;

const helperFactory = function (formatType) {
    function throwError () {
        return new Error(`${formatType} requires a single unname argument. {{format-${formatType} value}}`);
    }

    return Ember.Helper.extend({
        intl: Ember.inject.service(),
        formatter: null,

        init() {
            this._super(...arguments);
            const intl = get(this, 'intl');
            this.formatter = this.container.lookup(`ember-intl@formatter:format-${formatType}`);
            intl.on('localeChanged', this, this.recompute);
        },

        destroy() {
            const intl = get(this, 'intl');
            intl.off('localeChanged', this, this.recompute);
            return this._super(...arguments);
        },

        compute(params, hash) {
            if (!params || !params.length) {
                return throwError();
            }

            const value = params[0];
            const intl  = get(this, 'intl');
            let format  = {};

            if (hash && hash.format) {
                format = intl.getFormat(formatType, hash.format) || {};
            }

            return this.formatter.format(
                value,
                extend({
                    locale: get(intl, '_locale')
                }, format, hash),
                get(intl, 'formats')
            );
        }
    });
};

export default helperFactory;
