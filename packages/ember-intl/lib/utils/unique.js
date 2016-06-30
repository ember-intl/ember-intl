/* jshint node: true */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var castArray = require('./cast-array');

function unique(array) {
  var found = Object.create(null);
  var out = [];

  castArray(array).forEach(function(item) {
    if (typeof item !== 'string' || found[item.toLocaleLowerCase()]) {
      return;
    }

    out.push(item);
    found[item.toLocaleLowerCase()] = true;
  });

  return out;
};

module.exports = unique;
