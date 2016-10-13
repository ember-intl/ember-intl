/* jshint node: true */
'use strict';

var path = require('path');
var funnel = require('broccoli-funnel');
var replace = require('broccoli-string-replace');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-intl-icu-bundle',

  treeForAddon: function(tree) {
    var messageFormatPath = path.dirname(require.resolve('intl-messageformat'));
    var relativeFormatPath = path.dirname(require.resolve('intl-relativeformat'));

    var messageFormatParserTree = funnel(path.join(messageFormatPath, 'src'), {
      destDir: 'messageformat'
    });

    var relativeFormatTree = funnel(path.join(relativeFormatPath, 'src'), {
      destDir: 'relativeformat'
    });

    relativeFormatTree = replace(relativeFormatTree, {
      files: ['relativeformat/core.js'],
      patterns: [{
        match: " from 'intl-messageformat'",
        replacement: ' from "ember-intl-icu-bundle/messageformat"'
      }]
    });

    var trees = mergeTrees([messageFormatParserTree, relativeFormatTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
};
