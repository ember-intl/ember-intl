const { ordinals } = require('../utils/cldr-core');

function extractOrdinalCategories() {
  const ordinalCategories = {};

  Object.keys(ordinals).forEach((locale) => {
    const pluralRuleNames = Object.keys(ordinals[locale]);

    ordinalCategories[locale] = pluralRuleNames.map((name) => {
      return name.replace(/^pluralRule-count-/, '');
    });
  });

  return ordinalCategories;
}

module.exports = extractOrdinalCategories();
