/* jshint node: true */

'use strict';

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

var extractCLDRData = require('formatjs-extract-cldr-data');
var CachingWriter = require('broccoli-caching-writer');
var assign = require('ember-cli-lodash-subset').assign;
var mkdirp = require('mkdirp');
var fs = require('fs');

Plugin.prototype = Object.create(CachingWriter.prototype);
Plugin.prototype.constructor = Plugin;

function Plugin(inputNodes, options) {
  options = options || {};

  CachingWriter.call(this, inputNodes, {
    annotation: options.annotation
  });

  this.destDir = options.destDir;
  delete options.destDir;

  this.options = assign({
    locales: null,
    pluralRules: true,
    relativeFields: true,
    prelude: '',
    wrapEntry: undefined
  }, options);
}

Plugin.prototype.build = function() {
  var options = this.options;
  var destPath = this.outputPath + '/' + this.destDir;
  var cldrData = extractCLDRData(options);

  var cldrDataByLang = Object.keys(cldrData).reduce(function(map, locale) {
    var data = cldrData[locale];
    var lang = locale.split('-')[0];
    var langData = map[lang] || [];
    map[lang] = langData.concat(data);

    return map;
  }, {});

  mkdirp.sync(destPath);

  Object.keys(cldrDataByLang).forEach(function(lang) {
    var cldrData = cldrDataByLang[lang];

    if (typeof options.wrapEntry === 'function') {
      cldrData = options.wrapEntry(cldrData);
    }

    var outFile = destPath + '/' + lang.toLocaleLowerCase() + '.js';
    fs.writeFileSync(outFile, options.prelude.concat(cldrData), { encoding: 'utf8' });
  });
};

module.exports = Plugin;
