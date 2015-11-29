/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import factory from './-format-base';

const { isEmpty } = Ember;

export function shouldReturnEmptyString(value, hash) {
  if (isEmpty(value) && (!hash.hasOwnProperty('allowEmpty') || hash.allowEmpty)) {
    return true;
  }

  return false;
}

export default factory('date', shouldReturnEmptyString);
