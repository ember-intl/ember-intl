/* jshint node: true */

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

'use strict';

var cldr          = require('formatjs-extract-cldr-data');
var CachingWriter = require('broccoli-caching-writer');
var mkdirp        = require('mkdirp');
var path          = require('path');
var fs            = require('fs');

if (!Object.assign) {
    Object.assign = require('object.assign');
}

function LocaleWriter (inputTrees, outputPath, options) {
    if (!(this instanceof LocaleWriter)) {
        return new LocaleWriter(inputTrees, outputPath, options);
    }

    if (!Array.isArray(inputTrees)) {
        inputTrees = [inputTrees];
    }

    CachingWriter.call(this, inputTrees, options);

    this.options = Object.assign({
        locales:        undefined,
        pluralRules:    false,
        relativeFields: false,
        prelude:        '',
        wrapEntry:      undefined // todo: behaves slightly different, rename to transform?
    }, options);

    this.outputPath = outputPath;
}

LocaleWriter.prototype = Object.create(CachingWriter.prototype);
LocaleWriter.prototype.constructor = LocaleWriter;

LocaleWriter.prototype.updateCache = function (includePaths, destDir) {
    var destPath    = path.join(destDir, this.outputPath);
    var options     = this.options;
    var wrapEntry   = options.wrapEntry;
    var localesData = cldr(options);

    mkdirp.sync(destPath);

    Object.keys(localesData).forEach(function (localeKey) {
        var result = localesData[localeKey];

        if (typeof wrapEntry === 'function') {
            result = wrapEntry(result);
        }

        var outFile = path.join(destPath, localeKey.toLowerCase() + '.js');
        var file = options.prelude + result;
        fs.writeFileSync(outFile, file, { encoding: 'utf8' });
    }, this);
};

LocaleWriter.has = function (locale) {
    try {
        return !!cldr({
            locales: [locale]
        });
    } catch (err) {
        return false;
    }
};

module.exports = LocaleWriter;
