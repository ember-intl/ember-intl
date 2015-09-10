/* jshint node: true */

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

'use strict';

var CachingWriter = require('broccoli-caching-writer');
var cldr = require('formatjs-extract-cldr-data');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

var assign = require('../utils/assign');

var CldrWriter = CachingWriter.extend({
  init: function(inputTrees, options) {
    this._super(inputTrees);

    this.options = assign({
      locales:    undefined,
      pluralRules:  false,
      relativeFields: false,
      prelude:    '',
      wrapEntry:    undefined // todo: behaves slightly different, rename to transform?
    }, options);

    this.path = this.options.path;
    delete this.options.path;
  },

  updateCache: function(srcPaths, destDir) {
    var options = this.options;
    var destPath = path.join(destDir, this.path);
    var wrapEntry = options.wrapEntry;
    var localesData = cldr(options);

    mkdirp.sync(destPath);

    Object.keys(localesData).forEach(function(localeKey) {
      var result = localesData[localeKey];

      if (typeof wrapEntry === 'function') {
        result = wrapEntry(result);
      }

      var outFile = path.join(destPath, localeKey.toLocaleLowerCase() + '.js');
      var data = options.prelude + result;
      fs.writeFileSync(outFile, data, { encoding: 'utf8' });
    });
  }
});

module.exports = CldrWriter;
