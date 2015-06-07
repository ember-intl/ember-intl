/* jshint node: true */

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

'use strict';

var CachingWriter = require('broccoli-caching-writer');
var walkSync      = require('walk-sync');
var yaml          = require('js-yaml');
var mkdirp        = require('mkdirp');
var extend        = require('extend');
var chalk         = require('chalk');
var path          = require('path');
var fs            = require('fs');

/**
* Turns an object into a single dimensional array of strings
*
* propKeys({ a: true, b: { c: true }}) => ["a", "b.c"]
*
* NOTE" Period within a key are escaped.
* ie, `propKeys({ 'a.a': true, b: { c: true }})` => `["a\.a", "b.c"]`
*
* @method propKeys
* @param {Object} object
* @return {Array} Returns array of strings
* @private
*/
function propKeys (object) {
    var result = [];
    var escaped;

    for (var key in object) {
        escaped = key.replace(/\./g, '\\.');

        if (object.hasOwnProperty(key)) {
            if (typeof object[key] === 'object') {
                result = result.concat(propKeys(object[key]).map(function (_key) {
                    return escaped + '.' + _key;
                }));
            } else {
                result.push(escaped);
            }
        }
    }

    return result;
}

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

TranslationBlender.prototype.readAsObject = function (path) {
    var fileContent = fs.readFileSync(path);
    return JSON.parse(fileContent);
};

TranslationBlender.prototype.report = function (target, defaultTranslationProps, locale) {
    var targetProps = propKeys(target);

    defaultTranslationProps.forEach(function (property) {
        if (targetProps.indexOf(property) === -1) {
            console.log(chalk.yellow('[ember-intl] "' + property + '" missing from ' + locale));
        }
    });
}

TranslationBlender.prototype.exportWrap = function (json) {
    return 'export default ' + JSON.stringify(json) + ';';
};

TranslationBlender.prototype.updateCache = function (includePaths, destDir) {
    if (!this.options.defaultTranslation) {
        return;
    }

    var includePath             = includePaths[0];
    var outputPath              = path.join(destDir, this.options.outputPath);

    // TODO: glob here for the default file so we can determine json vs yaml
    // based on the extension name
    var defaultTranslation      = this.readAsObject(path.join(includePath, this.options.defaultTranslation + '.json'));
    var defaultTranslationProps = propKeys(defaultTranslation);
    var translation, filename, locale;

    mkdirp.sync(outputPath);

    walkSync(includePath).forEach(function (file) {
        translation = this.readAsObject(path.join(includePath, file));
        locale = file.split('.')[0];

        this.report(translation, defaultTranslationProps, locale);

        translation = extend(true, {}, defaultTranslation, translation);
        filename = path.join(outputPath, file.replace(path.extname(file), '.js'));
        fs.writeFileSync(filename, this.exportWrap(translation), { encoding: 'utf8' });
    }, this);
};

module.exports = TranslationBlender;
