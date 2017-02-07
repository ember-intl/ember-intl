/* jshint node: true */

'use strict';

let path = require('path');
let Funnel = require('broccoli-funnel');
let mergeTrees = require('broccoli-merge-trees');
let renameTree = require('broccoli-stew').rename;
let UnwatchedDir = require('broccoli-source').UnwatchedDir;

function lowercaseTree(tree) {
  return renameTree(tree, function(filepath) {
    return filepath.toLocaleLowerCase();
  });
}

module.exports = function intlPolyfill(opts) {
  let tree = new UnwatchedDir(path.dirname(require.resolve('intl')));
  let trees = [];

  trees.push(new Funnel(tree, {
    srcDir: 'dist',
    files: ['Intl.js.map'],
    destDir: opts.destDir
  }));

  let polyfillTree = new Funnel(tree, {
    srcDir: 'dist',
    files: ['Intl.complete.js', 'Intl.js', 'Intl.min.js'],
    destDir: opts.destDir
  });

  let localeFunnel = {
    srcDir: 'locale-data/jsonp',
    destDir: opts.destDir + '/locales'
  };

  if (opts.locales.length) {
    localeFunnel.include = opts.locales.map(function(locale) {
      return new RegExp('^' + locale + '.js$', 'i');
    });
  }

  let localesTree = new Funnel(tree, localeFunnel);

  trees.push(lowercaseTree(mergeTrees([polyfillTree, localesTree])));

  return mergeTrees(trees);
};
