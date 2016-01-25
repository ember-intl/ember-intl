/* jshint node: true */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var rename = require('broccoli-stew').rename;

function lowercaseTree(tree) {
  return rename(tree, function(filepath) {
    return filepath.toLocaleLowerCase();
  });
}

module.exports = lowercaseTree;
