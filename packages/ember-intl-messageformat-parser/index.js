/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

var messageFormatParserPath = path.dirname(require.resolve('intl-messageformat-parser'));

module.exports = {
  name: 'intl-messageformat-parser',

  treeForAddon: function(tree) {
    var messageFormatParserTree = new Funnel(path.join(messageFormatParserPath, 'src'), {
      files: ['parser.js']
    });

    var trees = mergeTrees([messageFormatParserTree, tree]);

    return this._super.treeForAddon.call(this, trees);
  }
};
