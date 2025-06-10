const { plurals } = require('../utils/cldr-core');

function extractPluralCategories() {
  const pluralCategories = {};

  Object.keys(plurals).forEach((locale) => {
    const pluralRuleNames = Object.keys(plurals[locale]);

    pluralCategories[locale] = pluralRuleNames.map((name) => {
      return name.replace(/^pluralRule-count-/, '');
    });
  });

  return pluralCategories;
}

module.exports = extractPluralCategories();
