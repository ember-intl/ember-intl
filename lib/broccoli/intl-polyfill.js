/* eslint-env node */

'use strict';

let path = require('path');
let funnel = require('broccoli-funnel');
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

  trees.push(
    funnel(tree, {
      srcDir: 'dist',
      include: ['*.map'],
      destDir: opts.destDir
    })
  );

  let polyfillTree = funnel(tree, {
    srcDir: 'dist',
    include: ['*.js'],
    destDir: opts.destDir
  });

  let localeFunnel = {
    srcDir: 'locale-data/jsonp',
    destDir: `${opts.destDir}/locales`
  };

  if (opts.locales.length) {
    localeFunnel.include = opts.locales.map(locale => new RegExp(`^${locale}.js$`, 'i'));
  }

  let localesTree = funnel(tree, localeFunnel);

  trees.push(lowercaseTree(mergeTrees([polyfillTree, localesTree])));

  return mergeTrees(trees);
};
