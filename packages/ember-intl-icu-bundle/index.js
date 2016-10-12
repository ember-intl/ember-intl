/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var replace = require('broccoli-string-replace');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-intl-icu-bundle',

  treeForAddon: function(tree) {
    if (this.isEnabled()) {
      var messageFormatPath = path.dirname(require.resolve('intl-messageformat'));
      var relativeFormatPath = path.dirname(require.resolve('intl-relativeformat'));

      var messageFormatParserTree = new Funnel(path.join(messageFormatPath, 'src'), {
        destDir: 'messageformat'
      });

      var relativeFormatTree = new Funnel(path.join(relativeFormatPath, 'src'), {
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
  },

  isEnabled: function() {
    // TODO: inspect project to determine if it contains another compiler
    return true;
  }
};
