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

function hasCLDR (locale) {
    try {
        return !!cldr({
            locales: [locale]
        });
    } catch (err) {
        return false;
    }
}

function LocaleWriter (inputTrees, options) {
    if (!(this instanceof LocaleWriter)) {
        return new LocaleWriter(inputTrees, options);
    }

    CachingWriter.call(this, inputTrees, options);

    options = options || {};
    options.destDir = options.destDir || 'cldrs';

    this.options = options;
    this.transform = this.options.transform;
}

LocaleWriter.prototype = Object.create(CachingWriter.prototype);
LocaleWriter.prototype.constructor = LocaleWriter;

LocaleWriter.prototype.updateCache = function (includePaths, destDir) {
    var destPath = path.join(destDir, this.options.destDir);

    mkdirp.sync(destPath);

    var localesData = cldr(objectAssign({
        pluralRules:    true,
        relativeFields: true
    }, this.options));

    Object.keys(localesData).forEach(function (localeKey) {
        var localeData = localesData[localeKey];
        var data       = localeData;

        if (typeof this.transform === 'function') {
            data = this.transform(localeData.locale, {
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

LocaleWriter.hasCLDR = hasCLDR;

module.exports = LocaleWriter;
