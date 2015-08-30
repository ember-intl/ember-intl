/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import helperFactory from './-base';

export function shouldReturnEmptyString(value, hash) {
  if (Ember.isEmpty(value)) {
    if (!hash.hasOwnProperty('allowEmpty') || hash.allowEmpty) {
      return true;
    }
  }

  return false;
}

export default helperFactory('date', null, shouldReturnEmptyString);
