/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

var formatCachePath = path.dirname(require.resolve('intl-format-cache'));

module.exports = {
  name: 'intl-format-cache',

  treeForAddon: function(tree) {
    var formatCacheTree = new Funnel(path.join(formatCachePath, 'src'));
    var trees = mergeTrees([formatCacheTree, tree], { overwrite: true });

    return this._super.treeForAddon.call(this, trees);
  }
};
