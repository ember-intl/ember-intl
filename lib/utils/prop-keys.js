/* eslint-env node */

'use strict';

const forEachMessage = require('./for-each-message');

/*
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/**
 * Turns an object into a single dimensional array of strings
 *
 * propKeys({ a: true, b: { c: true }}) => ["a", "b.c"]
 *
 * NOTE" Period within a key are escaped.
 * ie, `propKeys({ 'a.a': true, b: { c: true }})` => `["a\.a", "b.c"]`
 *
 * @method propKeys
 * @param {Object} object
 * @return {Array} Returns array of strings
 * @private
 */
function propKeys(object) {
  let result = [];
  forEachMessage(object, key => result.push(key));
  return result;
}

module.exports = propKeys;
