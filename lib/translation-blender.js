/* jshint node: true */

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

'use strict';

var CachingWriter = require('broccoli-caching-writer');
var walkSync      = require('walk-sync');
var mkdirp        = require('mkdirp');
var extend        = require('extend');
var path          = require('path');
var fs            = require('fs');

function TranslationBlender (inputTrees, options) {
    if (!(this instanceof TranslationBlender)) {
        return new TranslationBlender(inputTrees, options);
    }

    if (!Array.isArray(inputTrees)) {
        inputTrees = [inputTrees];
    }

    CachingWriter.call(this, inputTrees, options);

    this.options = options;
    this.outputPath = options.destDir;
}

TranslationBlender.prototype = Object.create(CachingWriter.prototype);
TranslationBlender.prototype.constructor = TranslationBlender;

TranslationBlender.prototype.readToJson = function (path) {
    return JSON.parse(fs.readFileSync(path));
};

TranslationBlender.prototype.exportWrap = function (json) {
    return "export default " + JSON.stringify(json) + ";";
};

TranslationBlender.prototype.updateCache = function (includePaths, destDir) {
    var baseLocale = this.options.defaultLocale;
    if (!baseLocale) { return; }

    var translationsSrc = includePaths[0];
    var outputPath = path.join(destDir, this.options.outputPath);
    var base = this.readToJson(path.join(translationsSrc, baseLocale + '.json'));
    var json, filename;

    mkdirp.sync(outputPath);

    walkSync(translationsSrc).forEach(function (file) {
        json = this.readToJson(path.join(translationsSrc, file));
        json = extend(true, {}, base, json);
        filename = path.join(outputPath, file.replace('.json', '.js'));
        fs.writeFileSync(filename, this.exportWrap(json), { encoding: 'utf8' });
    }, this);
};

module.exports = TranslationBlender;
