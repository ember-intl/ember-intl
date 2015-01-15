/* jshint node: true */
'use strict';

var Writer             = require('./lib/writer');
var path               = require('path');
var messageFormatPath  = path.dirname(require.resolve('intl-messageformat'));
var relativeFormatPath = path.dirname(require.resolve('intl-relativeformat'));
var intlPath           = path.dirname(require.resolve('intl'));

module.exports = {
  name: 'ember-intl',

  included: function (app) {
    this.app = app;

    if (app.tests && app.name === 'dummy') {
      console.warn('======================================================================');
      console.warn('=== messageformat & relativeformat WITH locales. For testing only. ===');
      console.warn('======================================================================');

      app.import('vendor/messageformat/intl-messageformat-with-locales.js');
      app.import('vendor/relativeformat/intl-relativeformat-with-locales.js');
    } else {
      app.import('vendor/messageformat/intl-messageformat.js');
      app.import('vendor/relativeformat/intl-relativeformat.js');
    }
  },

  treeForVendor: function (tree) {
    var trees = [];

    if (tree) {
      trees.push(tree);
    }

    trees.push(this.pickFiles(this.treeGenerator(messageFormatPath), {
      srcDir:  '/dist',
      destDir: 'messageformat'
    }));

    trees.push(this.pickFiles(this.treeGenerator(relativeFormatPath), {
      srcDir:  '/dist',
      destDir: 'relativeformat'
    }))

    return this.mergeTrees(trees);
  },

  treeForPublic: function (tree) {
    var app        = this.app;
    var config     = this.project.config(app.env);
    var intlConfig = config.intl || {};

    if (intlConfig.disableShim) {
      return tree;
    }

    var trees = [tree];

    if (intlConfig.intl) {
      trees.push(new Writer(tree, intlConfig.intl));
    }

    trees.push(this.pickFiles(intlPath, {
      srcDir:  '/',
      files:   ['Intl.complete.js', 'Intl.js', 'Intl.min.js'],
      destDir: '/assets/intl/'
    }));

    // only use these when using Intl.js, should not be used
    // with the native Intl API
    trees.push(this.pickFiles(intlPath + '/locale-data/jsonp', {
      srcDir:  '/',
      files:   ['*.js'],
      destDir: '/assets/intl/base-locales/'
    }));

    return this.mergeTrees(trees);
  }
};
