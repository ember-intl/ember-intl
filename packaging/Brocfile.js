/* jshint node: true */

'use strict';

process.chdir(__dirname);

/**
 * Packaging was dervived from the work of by:
 * https://github.com/ef4/liquid-fire/tree/master/packaging
 * Full credit to Edward Faulkner (https://github.com/ef4)
 * and the rest of the liquid-fire team
 */
var mergeTrees    = require('broccoli-merge-trees');
var pickFiles     = require('broccoli-static-compiler');
var compileES6    = require('broccoli-es6-concatenator');
var es3Safe       = require('broccoli-es3-safe-recast');
var Funnel        = require('broccoli-funnel');

var registry      = require('./registry');
var wrap          = require('./wrap');

var emberAppend   = new Funnel('.', { include: [/^ember-append\.js$/] });

var appTree       = pickFiles('../app',   { srcDir: '/', destDir: 'app' });
var addonTree     = pickFiles('../addon', { srcDir: '/', destDir: 'ember-intl' });
var loader        = pickFiles('../bower_components', { srcDir: '/loader.js', destDir: '/' });

var precompiled   = mergeTrees([addonTree, appTree]);

var registrations = registry(pickFiles(precompiled,  {
    srcDir:       '/app',
    destDir:      '/',
    outputPrefix: 'app'
}));

var jsTree = mergeTrees([emberAppend, mergeTrees([precompiled, registrations, loader])]);

var compiled = wrap(compileES6(jsTree, {
    wrapInEval:          false,
    loaderFile:          'loader.js',
    outputFile:          '/ember-intl.js',
    inputFiles:          ['ember-intl/index.js', 'app/**/*.js'],
    ignoredModules:      ['ember', 'ember-intl'],
    legacyFilesToAppend: ['registry-output.js', 'ember-append.js']
}));

module.exports = mergeTrees([es3Safe(compiled)]);
