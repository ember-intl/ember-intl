/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  function treeGenerator (dir) {
    return {
      read: function () { return dir; },
      cleanup: function () { }
    }
  };

  var polyfillTree = new Funnel(treeGenerator('node_modules/intl/dist'), {
    files:   ['Intl.complete.js'],
    srcDir:  '/',
    destDir: '/assets/polyfill/'
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return mergeTrees([polyfillTree, app.toTree()]);
};
