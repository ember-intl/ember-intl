/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import ICU from '../models/icu';

var Helper = null;

if (Ember.Helper) {
    Helper = Ember.Helper.extend({
       compute(params) {
           return new ICU(params[0]);
       }
    });
}


export default Helper;
