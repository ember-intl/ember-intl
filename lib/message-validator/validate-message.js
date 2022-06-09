const { parse, TYPE } = require('@formatjs/icu-messageformat-parser');

const pluralCategories = require('./plural-categories');
const ordinalCategories = require('./ordinal-categories');
const traverse = require('./ast-traverse');
const parseOptions = require('../parse-options');

function validateMessage(message, locale) {
  const ast = parse(message, parseOptions);
  const language = locale.split('-')[0];
  const validPlurals = pluralCategories[language];
  const validOrdinals = ordinalCategories[language];

  traverse(ast, {
    [TYPE.plural]: (node) => {
      const selectors = Object.keys(node.options).map((s) => s.trim());

      if (!selectors.includes('other')) {
        throw new MissingOtherSelectorError();
      }

      if (!locale) {
        return;
      }

      const isOrdinal = node.pluralType === 'ordinal';
      const validSelectors = isOrdinal ? validOrdinals : validPlurals;
      const invalidSelectors = selectors.filter((selector) => {
        return validSelectors.indexOf(selector) === -1 && !/=\d+/.test(selector);
      });

      if (invalidSelectors.length) {
        if (isOrdinal) {
          throw new UnknownOrdinalCategoriesError(invalidSelectors);
        } else {
          throw new UnknownPluralCategoriesError(invalidSelectors);
        }
      }
    },

    [TYPE.select]: (node) => {
      const selectors = Object.keys(node.options).map((s) => s.trim());

      if (!selectors.includes('other')) {
        throw new MissingOtherSelectorError();
      }
    },
  });
}

class UnknownPluralCategoriesError extends Error {
  constructor(categories) {
    super(
      categories.length === 1
        ? `Unknown plural category: ${categories[0]}`
        : `Unknown plural categories: ${categories.join(', ')}`
    );
  }
}

class UnknownOrdinalCategoriesError extends Error {
  constructor(categories) {
    super(
      categories.length === 1
        ? `Unknown ordinal category: ${categories[0]}`
        : `Unknown ordinal categories: ${categories.join(', ')}`
    );
  }
}

class MissingOtherSelectorError extends Error {
  constructor() {
    super('Missing selector: other');
  }
}

module.exports = validateMessage;
