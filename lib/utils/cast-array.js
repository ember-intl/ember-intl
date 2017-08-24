/* eslint-env node */

'use strict';

function castArray(obj) {
  if (typeof obj === 'undefined') {
    return [];
  }

  return Array.isArray(obj) ? obj : [obj];
}

module.exports = castArray;
