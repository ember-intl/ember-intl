/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

var messageFormatPath = path.dirname(require.resolve('intl-messageformat'));

module.exports = {
  name: 'intl-messageformat',

  treeForAddon: function(tree) {
    var messageFormatParserTree = new Funnel(path.join(messageFormatPath, 'src'));
    var trees = mergeTrees([messageFormatParserTree, tree], { overwrite: true });

    return this._super.treeForAddon.call(this, trees);
  }
};
