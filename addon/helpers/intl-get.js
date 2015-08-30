/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { Helper, inject, get } = Ember;

let IntlGetHelper = null;

if (Helper) {
    IntlGetHelper = Helper.extend({
        intl: inject.service(),

        init(...args) {
            this._super(...args);
            const intl = get(this, 'intl');
            intl.on('localeChanged', this, this.recompute);
        },

        destroy(...args) {
            const intl = get(this, 'intl');
            intl.off('localeChanged', this, this.recompute);
            this._super(...args);
        },

        compute(params, hash = {}) {
            const intl = get(this, 'intl');
            return intl.findTranslationByKey(params[0], hash.locale);
        }
    });
}


export default IntlGetHelper;
