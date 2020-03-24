/* eslint-env node */

'use strict';

function extractPluralCategories() {
  let plurals = require('cldr-core/supplemental/plurals.json').supplemental['plurals-type-cardinal'];

  let pluralCategories = {};
  Object.keys(plurals).forEach((locale) => {
    pluralCategories[locale] = Object.keys(plurals[locale]).map((key) => key.replace('pluralRule-count-', ''));
  });

  return pluralCategories;
}

module.exports = extractPluralCategories();
