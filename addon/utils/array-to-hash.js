import EmptyObject from 'ember-intl/utils/empty-object';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

function arrayToHash(array) {
  const len = array.length;
  const out = new EmptyObject();
  let i = 0;

  for (; i < len; i++) {
    const key = array[i];
    out[key] = key;
  }

  return out;
}

export default arrayToHash;
