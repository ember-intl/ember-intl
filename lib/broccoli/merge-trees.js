'use strict';

//
// Full credit to Ember CLI
// source: https://raw.githubusercontent.com/ember-cli/ember-cli/88c909cb10dd558ac0bc47b77412c12f050a2952/lib/broccoli/merge-trees.js
//
var upstreamMergeTrees = require('broccoli-merge-trees');

module.exports = function(inputTree, options) {
  options = options || {};
  options.description = options.annotation;

  var tree = upstreamMergeTrees(inputTree, options);
  tree.description = options && options.description;

  return tree;
};
