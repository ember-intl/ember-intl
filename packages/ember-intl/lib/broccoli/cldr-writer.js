/* jshint node: true */

'use strict';

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

var CachingWriter = require('broccoli-caching-writer');
var extract = require('formatjs-extract-cldr-data');
var assign = require('lodash/assign');
var mkdirp = require('mkdirp');
var fs = require('fs');

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

  Object.keys(localesData).forEach(function(locale) {
    var result = localesData[locale];

    if (typeof wrapEntry === 'function') {
      result = wrapEntry(result);
    }

    var outFile = destPath + '/' + locale.toLocaleLowerCase() + '.js';
    var data = options.prelude + result;

    fs.writeFileSync(outFile, data, { encoding: 'utf8' });
  });
}

module.exports = Plugin;
