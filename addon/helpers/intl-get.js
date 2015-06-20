/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var Helper = null;

if (Ember.Helper) {
    Helper = Ember.Helper.extend({
       intl: Ember.inject.service(),
       compute(params, hash) {
           return this.get('intl').findTranslation(params[0], hash.locale);
       }
    });
}


export default Helper;
