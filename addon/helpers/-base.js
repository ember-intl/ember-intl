/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import extend from '../utils/extend';
import computed from 'ember-new-computed';

const { Helper, inject, get } = Ember;

function getValue(params) {
    return params[0];
}

function helperFactory(formatType, optionalGetValue, optionalValidator) {
    return Helper.extend({
        intl: inject.service(),
        formatType: formatType,

        formatter: computed('formatType', {
            get() {
                return this.container.lookup(`ember-intl@formatter:format-${formatType}`);
            }
        }),

        init() {
            this._super(...arguments);
            let intl = get(this, 'intl');
            intl.on('localeChanged', this, this.recompute);
        },

        getValue: optionalGetValue || getValue,

        compute(params, hash) {
            let intl = get(this, 'intl');
            let formatter = get(this, 'formatter');
            let value = this.getValue(params, hash, intl);
            let isValidValue = true;

            if (optionalValidator) {
                isValidValue = optionalValidator(value, hash);

                if (!isValidValue) {
                    return;
                }
            }

            if (typeof value === 'undefined') {
                throw new Error(`format-${formatType} helper requires value`);
            }

            let format = {};

            if (hash.format) {
                format = intl.getFormat(formatType, hash.format);
            }

            return formatter.format(
                value,
                extend({
                    locale: get(intl, '_locale')
                }, format, hash),
                get(intl, 'formats')
            );
        },

        destroy() {
            const intl = get(this, 'intl');
            intl.off('localeChanged', this, this.recompute);
            return this._super(...arguments);
        }
    });
}

export default helperFactory;
