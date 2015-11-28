/* jshint node: true */

'use strict';

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

var CachingWriter = require('broccoli-caching-writer');
var stringify = require('json-stable-stringify');
var walkSync = require('walk-sync');
var mkdirp = require('mkdirp');
var extend = require('extend');
var yaml = require('js-yaml');
var chalk = require('chalk');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

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
function propKeys(object) {
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

function readAsObject(filepath) {
  var data = fs.readFileSync(filepath);
  var ext = path.extname(filepath);

  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data, 'utf8');
  }
}

function missedKeys(target, defaultTranslationKeys, locale) {
  var targetProps = propKeys(target);

  defaultTranslationKeys.forEach(function (property) {
    if (targetProps.indexOf(property) === -1) {
      console.log(chalk.yellow('ember-intl: \'' + property + '\' missing from ' + locale));
    }
  });
}

function exporter(obj) {
  return 'export default ' + stringify(obj) + ';';
}

function gatherTranslations(inputPath) {
  return walkSync(inputPath).reduce(function (translations, file) {
    var fullPath = inputPath + '/' + file;

    if (fs.statSync(fullPath).isDirectory()) {
      return translations;
    } else {
      var translation = readAsObject(inputPath + '/' + file);

      if (!translation) {
        console.log(chalk.yellow('ember-intl: cannot read path "' + fullPath + '"'));
        return translations;
      }

      var basename = path.basename(file).split('.')[0];
      var keyedTranslation = {};
      keyedTranslation[basename] = translation;

      return extend(true, translations, keyedTranslation);
    }
  }, {});
}

function TranslationPreprocessor(inputNode, options) {
  options = options || {};

  if (!(this instanceof TranslationPreprocessor)) {
    return new TranslationPreprocessor(inputNode, options);
  }

  if (!Array.isArray(inputNode)) {
    inputNode = [inputNode];
  }

  CachingWriter.call(this, inputNode, { annotation: options.annotation });

  this.options = options;
}

TranslationPreprocessor.prototype = Object.create(CachingWriter.prototype);
TranslationPreprocessor.prototype.constructor = TranslationPreprocessor;

TranslationPreprocessor.prototype.build = function() {
  if (!this.options.defaultLocale) {
    return;
  }

  var inputPath = this.inputPaths[0];

  var defaultTranslationPath = glob.sync(inputPath + '/' + this.options.defaultLocale + '\.@(json|yaml|yml)', {
    nosort: true,
    silent: true
  })[0];

  if (!defaultTranslationPath) {
    console.log(chalk.yellow('ember-intl: "' + this.options.defaultLocale + '" default locale missing `translations` folder'));
    return;
  }

  var translation;

  var outputPath = this.outputPath + '/' + this.options.outputPath;
  mkdirp.sync(outputPath);

  var translations = gatherTranslations(inputPath);
  var defaultTranslation = translations[this.options.defaultLocale];
  var defaultTranslationKeys = propKeys(defaultTranslation);

  for (var key in translations) {
    if (translations.hasOwnProperty(key)) {
      translation = translations[key];
      missedKeys(translation, defaultTranslationKeys, key);
      translation = extend(true, {}, defaultTranslation, translation);
      fs.writeFileSync(
        outputPath + '/' + key + '.js',
        exporter(translation), { encoding: 'utf8' }
      );
    }
  }
};

module.exports = TranslationPreprocessor;
