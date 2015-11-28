/* jshint node: true */

'use strict';

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

var CachingWriter = require('broccoli-caching-writer');
var extract = require('formatjs-extract-cldr-data');
var mkdirp = require('mkdirp');
var fs = require('fs');

var assign = require('../utils/assign');

Plugin.prototype = Object.create(CachingWriter.prototype);
Plugin.prototype.constructor = Plugin;

function Plugin(inputNodes, options) {
  options = options || {};

  CachingWriter.call(this, inputNodes, {
    annotation: options.annotation
  });

  this.options = assign({
    locales: undefined,
    pluralRules: false,
    relativeFields: false,
    prelude: '',
    wrapEntry: undefined // todo: behaves slightly different, rename to transform?
  }, options);

  this.path = this.options.path;
  delete this.options.path;
}

Plugin.prototype.build = function() {
  var options = this.options;
  var destPath = this.outputPath + '/' + this.path;
  var wrapEntry = options.wrapEntry;
  var localesData = extract(options);

  mkdirp.sync(destPath);

  Object.keys(localesData).forEach(function(localeKey) {
    var result = localesData[localeKey];

    if (typeof wrapEntry === 'function') {
      result = wrapEntry(result);
    }

    var outFile = destPath + '/' + localeKey.toLocaleLowerCase() + '.js';
    var data = options.prelude + result;

    fs.writeFileSync(outFile, data, { encoding: 'utf8' });
  });
}

module.exports = Plugin;
