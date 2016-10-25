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

function TranslationReducer(inputNode, options) {
  options = options || {};

  if (!(this instanceof TranslationReducer)) {
    return new TranslationReducer(inputNode, options);
  }

  if (!Array.isArray(inputNode)) {
    inputNode = [inputNode];
  }

  CachingWriter.call(this, inputNode, { annotation: 'Translation Reducer' });

  if (typeof options.log === 'undefined') {
    options.log = function() {}
  }

  this.options = options;
}

TranslationReducer.prototype = Object.create(CachingWriter.prototype);
TranslationReducer.prototype.constructor = TranslationReducer;

TranslationReducer.prototype.normalizeLocale = function(locale) {
  if (typeof locale === 'string') {
    return locale.toLowerCase();
  }

  return locale;
}

TranslationReducer.prototype.log = function(msg) {
  if (this.options.log) {
    return this.options.log.apply(undefined, arguments);
  }

  console.log(msg);
}

TranslationReducer.prototype.findMissingKeys = function(target, defaultTranslationKeys, locale) {
  var targetProps = propKeys(target);

  defaultTranslationKeys.forEach(function(property) {
    if (targetProps.indexOf(property) === -1) {
      this.log(property + ' missing from ' + locale);
    }
  }, this);
};

TranslationReducer.prototype.readDirectory = function(inputPath) {
  var plugin = this;
  var log = this.options.log;

  // sorted so that any translation path starts with `__addon__`
  // move to the head of the array.  this ensures the application's translations
  // take presidence over addon translations.
  var sortedPaths = walkSync(inputPath).sort(function(a, b) {
    if (a.indexOf('__addon__') === 0) {
      return -1;
    }

    return 1;
  });

  return sortedPaths.reduce(function (translations, file) {
    var fullPath = inputPath + '/' + file;

    if (fs.statSync(fullPath).isDirectory()) {
      return translations;
    }

    var translation = readAsObject(inputPath + '/' + file);

    if (!translation) {
      plugin.log('cannot read path "' + fullPath + '"');
      return translations;
    }

    var basename = path.basename(file).split('.')[0];
    var keyedTranslation = {};
    keyedTranslation[plugin.normalizeLocale(basename)] = translation;

    return extend(true, translations, keyedTranslation);
  }, {});
};

TranslationReducer.prototype.filename = function(key) {
  if (typeof this.options.filename === 'function') {
    return this.options.filename(key);
  }

  return key + '.json';
}

TranslationReducer.prototype.wrapEntry = function(obj) {
  if (typeof this.options.wrapEntry === 'function') {
    return this.options.wrapEntry(obj);
  }

  return stringify(obj);
}

TranslationReducer.prototype.build = function() {
  var plugin = this;
  var inputPath = this.inputPaths[0];
  var outputPath = this.outputPath + '/' + this.options.outputPath;
  var translations = this.readDirectory(inputPath);
  var defaultTranslationKeys, defaultTranslation, translation;

  mkdirp.sync(outputPath);

  if (this.options.baseLocale) {
    var defaultTranslationPath = glob.sync(inputPath + '/' + this.options.baseLocale + '\.@(json|yaml|yml)', {
      nosort: true,
      silent: true
    })[0];

    if (!defaultTranslationPath) {
      plugin.log(this.options.baseLocale + ' default locale missing `translations` folder');
      return;
    }

    defaultTranslation = translations[this.normalizeLocale(this.options.baseLocale)];
    defaultTranslationKeys = propKeys(defaultTranslation);
  }

  for (var key in translations) {
    if (translations.hasOwnProperty(key)) {
      translation = translations[key];

      if (this.options.baseLocale) {
        this.findMissingKeys(translation, defaultTranslationKeys, key);
      }

      translation = extend(true, {}, defaultTranslation, translation);

      fs.writeFileSync(outputPath + '/' + this.filename(key), this.wrapEntry(translation), { encoding: 'utf8' });
    }
  }
};

module.exports = TranslationReducer;
