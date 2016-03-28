/* jshint node: true */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var renameTree = require('broccoli-stew').rename;

function lowercaseTree(tree) {
  return renameTree(tree, function(filepath) {
    return filepath.toLocaleLowerCase();
  });
}

module.exports = lowercaseTree;
