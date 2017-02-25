/* jshint node: true */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

let castArray = require('./cast-array');

function unique(array) {
  let found = Object.create(null);
  let out = [];

  castArray(array).forEach(item => {
    if (typeof item !== 'string' || found[item.toLocaleLowerCase()]) {
      return;
    }

    out.push(item);
    found[item.toLocaleLowerCase()] = true;
  });

  return out;
}

module.exports = unique;
