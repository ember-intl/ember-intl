/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var assert = require('assert');
var cldr   = require('cldr');

exports.fields             = extractFields;
exports.pluralRuleFunction = extractPluralRuleFunction;
exports.isValidLocale      = isValidLocale;
exports.normalize          = normalize;

// -----------------------------------------------------------------------------

function normalize (localeName) {
    assert(typeof localeName === 'string', 'Normalize only operates on strings');

    return localeName.toLowerCase().replace(/-/g, '_');
}

function extractFields(locale, fieldNames) {
    assert(isValidLocale(locale), 'Invalid locale');

    var fields = cldr.extractFields(normalize(locale));

    if (fieldNames) {
        fields = fieldNames.reduce(function (filteredFields, fieldName) {
            filteredFields[fieldName] = fields[fieldName];
            return filteredFields;
        }, {});
    }

    if (!Object.keys(fields).length) {
        return null;
    }

    return fields;
}

function extractPluralRuleFunction(locale) {
    assert(isValidLocale(locale), 'Invalid locale');

    var fn = cldr.extractPluralRuleFunction(normalize(locale)).toString();

    // Remove unnecessary function name.
    fn = fn.replace('function anonymous(', 'function (');

    // ParseInt() is expensive given that we already know the input is a number.
    fn = fn.replace('if(typeof n==="string")n=parseInt(n,10);', 'n=Math.floor(n);');

    // js-hint asi.
    fn = fn.replace('"\n}', '";\n}');
    // js-hint W018 "Confusing use of '!'" caused by stuff like "!(n===11)".
    fn = fn.replace(/!\((\w+)===(\d+)\)/g, '($1!==$2)');
    // js-hint W018 "Confusing use of '!'" caused by stuff like "!(n%100===11)".
    fn = fn.replace(/!\((\w+)%(\d+)===(\d+)\)/g, '($1%$2!==$3)');

    // Keep it neat.
    fn = fn.replace(/\n/g, '');

    // make sure the function
    if (fn === 'function (n) {}') {
        return null;
    }

    /* jshint evil:true */
    eval('fn = ' + fn);
    /* jshint evil:false */
    return fn;
}

function isValidLocale(locale) {
    return cldr.localeIds.indexOf(normalize(locale)) >= 0;
}
