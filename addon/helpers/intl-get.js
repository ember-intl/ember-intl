/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { observer, get } = Ember;
let Helper = null;

if (Ember.Helper) {
    Helper = Ember.Helper.extend({
        intl: Ember.inject.service(),

        onIntlLocaleChanged: observer('intl.locale', function() {
            this.recompute();
        }),

        compute(params, hash = {}) {
            return get(this, 'intl').findTranslationByKey(params[0], hash.locale);
        }
    });
}


export default Helper;
