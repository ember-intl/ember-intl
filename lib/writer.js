/*
 * ember-extract-locales
 *
 *
 * Copyright (c) 2014 Yahoo Inc.
 * Licensed under the Yahoo BSD license.
 */

'use strict';

var defaults      = require('lodash-node/modern/objects/defaults');
var CachingWriter = require('broccoli-caching-writer');
var serialize     = require('serialize-javascript');
var uglify        = require('uglify-js');
var extract       = require('./extract');
var mkdirp        = require('mkdirp');
var RSVP          = require('rsvp');
var path          = require('path');
var fs            = require('fs');

function wrapEntry (serialized) {
	return '\t\t\t\tservice.addLocaleData(' + serialized + ');';
}

var defaultOptions = {
	locales:   extract.rootLocales(),
	plurals:   true,
	minify:    false,
	fields :   ['year', 'month', 'day', 'hour', 'minute', 'second'],
	prelude: function (key) {
		return [
			'var Ember = require(\'ember\')[\'default\'];',
			'Ember.Application.initializer({',
			'	before: \'ember-intl\',',
			'	name:   \'locale-' + key + '\',',
			'	initialize: function (container) {',
			'		Ember.subscribe(\'intl.loaded\', {',
			'			after:  Ember.K,',
			'			before: function () {',
			'				var service = container.lookup(\'intl:main\');\n',
		].join('\n')
	},
	footer:    [
			'			}',
			'		});',
			'	}',
			'});'
	].join('\n'),
	wrapEntry: wrapEntry
}

function minify (data) {
	var result = uglify.minify(data, { fromString: true });
	return result.code;
}

function writefile (options, resolve, reject) {
	var filepath = options.filepath;
	var dirname  = path.dirname(filepath);
	var data     = options.data;

	if (options.minify) {
		data = minify(data);
	}

	mkdirp(dirname, function (err) {
		if (err) { return reject(err); }

		fs.writeFile(filepath, new Buffer(data), function (_err) {
			if (_err) { return reject(_err); }

			resolve(filepath);
		});
	});
}

function Writer (inputTree, config) {
	if (!(this instanceof Writer)) {
		return new Writer(inputTree, config);
	}

	for (var key in config) {
		if (config.hasOwnProperty(key)) {
			config[key] = defaults(config[key], defaultOptions);
		}
	}

	this.intlConfig = config;
	this.inputTree  = inputTree;

	CachingWriter.apply(this, arguments);
}

Writer.prototype = Object.create(CachingWriter.prototype);
Writer.prototype.constructor = Writer;

Writer.prototype.normalizeName = function (localeName) {
	return localeName.toLowerCase().replace('-', '_');
}

Writer.prototype.makeArray = function (content) {
	if (content && content instanceof Array) {
		return content;
	}

	return new Array(content);
}

Writer.prototype.extract = function (settings) {
	settings         = settings || {};
	settings.locales = settings.locales || [];

	return this.makeArray(settings.locales).map(function (locale) {
		var data = { locale: locale };

		if (settings.plurals) {
			var pluralRuleFunction = extract.pluralRuleFunction(this.normalizeName(locale));

			if (pluralRuleFunction) {
				data.pluralRuleFunction = pluralRuleFunction;
			} else {
				return null;
			}
		}

		if (settings.fields) {
			var fields = extract.fields(this.normalizeName(locale), settings.fields);
			if (fields && Object.keys(fields).length) {
				data.fields = fields;
			} else {
				return null;
			}
		}

		return data;
	}.bind(this)).filter(function (localeData) {
		// Make sure there is data for the given locale.
		return !!localeData;
	});
}

Writer.prototype.updateCache = function (srcDir, destDir) {
	var writePromises = Object.keys(this.intlConfig).map(function (key) {
		var config  = this.intlConfig[key];
		var entries = this.extract(config);
		var minify  = config.minify;
		var dest    = path.join(destDir, config.dest);

		function serializeEntry (entry) {
			var serialized = serialize(entry);

			if (config.wrapEntry) {
				return config.wrapEntry(serialized);
			}

			return serialized;
		}

		return new RSVP.Promise(function (resolve, reject) {
			// is destination a directory ?
			var file;

			if (path.extname(dest) === '') {
				var promises = entries.map(function (entry) {
					var filepath = path.join(dest, entry.locale + '.js');
					file         = config.prelude(key) + serializeEntry(entry) + config.footer;

					return new RSVP.Promise (function (resolve, reject) {
						writefile({
							data:     file,
							filepath: filepath,
							minify:   minify
						}, resolve, reject);

						console.log(entries.length + ' locale files written to: ' + filepath);
					});
				});

				return RSVP.all(promises).then(resolve, reject);
			}

			file = config.prelude(key) + entries.map(serializeEntry).join('\n') + config.footer;

			writefile({
				data:     file,
				filepath: dest,
				minify:   minify
			}, resolve, reject);

			console.log('wrote locale data to: ' + dest);
		});
	}.bind(this));

	return RSVP.all(writePromises);
}

module.exports = Writer;
