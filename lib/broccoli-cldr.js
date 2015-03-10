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

var LocaleWriter = CachingWriter.extend({
    init: function (inputTrees, options) {
        if (!Array.isArray(inputTrees)) {
            this.inputTrees = [inputTrees];
        }

        this.options = objectAssign({
            outputPath:     undefined,
            locales:        undefined,
            pluralRules:    false,
            relativeFields: false,
            prelude:        '',
            wrapEntry:      undefined // todo: behaves slightly different, rename to transform?
        }, options);

        this.outputPath = options.outputPath;
        delete options.outputPath;
    },

    updateCache: function (srcPaths, destDir) {
        var destPath    = path.join(destDir, this.options.outputPath);
        var options     = this.options;
        var wrapEntry   = options.wrapEntry;
        var localesData = cldr(this.options);

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
});

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
