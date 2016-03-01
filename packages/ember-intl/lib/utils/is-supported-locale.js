/* jshint node: true */

'use strict';

var fs = require('fs');
var path = require('path');
var cldr = require('cldr-core/availableLocales');

var availableLocales = cldr.availableLocales.modern.map(function(localeFile) {
  return localeFile.toLowerCase();
});

module.exports = function(locale) {
  return availableLocales.indexOf(locale.toLowerCase()) > -1
}
