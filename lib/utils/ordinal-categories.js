/* jshint node: true */

'use strict';

function extractOrdinalCategories() {
  let ordinals = require('cldr-core/supplemental/ordinals.json').supplemental['plurals-type-ordinal'];

  let ordinalCategories = {};
  Object.keys(ordinals).forEach(locale => {
    ordinalCategories[locale] = Object.keys(ordinals[locale]).map(key => key.replace('pluralRule-count-', ''));
  });

  return ordinalCategories;
}

module.exports = extractOrdinalCategories();
