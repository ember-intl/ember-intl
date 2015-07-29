/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get } = Ember;

let Helper = null;

if (Ember.Helper) {
    Helper = Ember.Helper.extend({
        intl: Ember.inject.service(),

        init() {
            this._super(...arguments);
            const intl = get(this, 'intl');
            intl.on('localeChanged', this, this.recompute);
        },

        destroy() {
            const intl = get(this, 'intl');
            intl.off('localeChanged', this, this.recompute);
            return this._super(...arguments);
        },

        compute(params, hash = {}) {
            const intl = get(this, 'intl');
            return intl.findTranslationByKey(params[0], hash.locale);
        }
    });
}


export default Helper;
