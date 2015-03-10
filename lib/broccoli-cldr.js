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
            destDir: 'cldrs'
        }, options);
    },

    updateCache: function (srcPaths, destDir) {
        var destPath  = path.join(destDir, this.options.destDir);

        mkdirp.sync(destPath);

        var transform = this.options.transform;

        var localesData = cldr(objectAssign({
            pluralRules:    true,
            relativeFields: true
        }, this.options));

        Object.keys(localesData).forEach(function (localeKey) {
            var localeData = localesData[localeKey];
            var data       = localeData;

            if (typeof transform === 'function') {
                data = transform(localeData.locale, {
                    parentLocale: localeData.parentLocale,
                    pluralFn:     localeData.pluralRuleFunction,
                    fields:       localeData.fields
                });
            }

            var outFile = path.join(destPath, localeKey.toLowerCase() + '.js');
            console.log(data);
            fs.writeFileSync(outFile, data, { encoding: 'utf8' });
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
