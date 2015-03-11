/* jshint node: true */

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

'use strict';

var cldr          = require('formatjs-extract-cldr-data');
var CachingWriter = require('broccoli-caching-writer');
var objectAssign  = require('object.assign');
var mkdirp        = require('mkdirp');
var path          = require('path');
var fs            = require('fs');
var walkSync      = require('walk-sync');

function LocaleWriter (inputTrees, outputPath, options) {
    if (!(this instanceof LocaleWriter)) {
        return new LocaleWriter(inputTrees, outputPath, options);
    }

    if (!Array.isArray(inputTrees)) {
        inputTrees = [inputTrees];
    }

    CachingWriter.call(this, inputTrees, options);

    this.options = objectAssign({
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
        var localeData = localesData[localeKey];
        var data       = localeData;

        if (typeof wrapEntry === 'function') {
            data = wrapEntry(localeData.locale, {
                parentLocale: localeData.parentLocale,
                pluralFn:     localeData.pluralRuleFunction,
                fields:       localeData.fields
            });
        }

        var outFile = path.join(destPath, localeKey.toLowerCase() + '.js');
        var file = options.prelude + data;
        console.log(file);
        fs.writeFileSync(outFile, file, { encoding: 'utf8' });
    }, this);
}

LocaleWriter.hasCLDR = function (locale) {
    try {
        return !!cldr({
            locales: [locale]
        });
    } catch (err) {
        return false;
    }
};

module.exports = LocaleWriter;
