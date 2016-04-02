/* jshint node: true */

'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var renameTree = require('broccoli-stew').rename;
var UnwatchedDir = require('broccoli-source').UnwatchedDir;

function lowercaseTree(tree) {
  return renameTree(tree, function(filepath) {
    return filepath.toLocaleLowerCase();
  });
}

module.exports = function(opts) {
  var tree = new UnwatchedDir(path.dirname(require.resolve('intl')));
  var trees = [];

  trees.push(new Funnel(tree, {
    srcDir: 'dist',
    files: ['Intl.js.map'],
    destDir: opts.destDir
  }));

  var polyfillTree = new Funnel(tree, {
    srcDir: 'dist',
    files: ['Intl.complete.js', 'Intl.js', 'Intl.min.js'],
    destDir: opts.destDir
  });

  var localeFunnel = {
    srcDir: 'locale-data/jsonp',
    destDir: opts.destDir + '/locales'
  };

  if (opts.locales.length) {
    localeFunnel.include = opts.locales.map(function(locale) {
      return new RegExp('^' + locale + '.js$', 'i');
    });
  }

  var localesTree = new Funnel(tree, localeFunnel);

  trees.push(lowercaseTree(mergeTrees([polyfillTree, localesTree])));

  return mergeTrees(trees);
};
