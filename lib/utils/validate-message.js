/* jshint node: true */

'use strict';

const messageParser = require('intl-messageformat-parser');

const pluralCategories = require('./plural-categories');
const ordinalCategories = require('./ordinal-categories');
const traverse = require('./ast-traverse');

function validateMessage(message, locale) {
  let ast = messageParser.parse(message);

  if (!locale) {
    return;
  }

  let language = locale.split('-')[0];
  let validPlurals = pluralCategories[language];
  let validOrdinals = ordinalCategories[language];

  traverse(ast, {
    pluralFormat: node => {
      let validSelectors = node.ordinal ? validOrdinals : validPlurals;

      let selectors = node.options.map(it => it.selector.trim());
      let invalidSelectors = selectors.filter(selector => {
        return validSelectors.indexOf(selector) === -1 && !(/=\d+/).test(selector);
      });

      if (invalidSelectors.length) {
        if (node.ordinal) {
          throw new UnknownOrdinalCategoriesError(invalidSelectors);
        } else {
          throw new UnknownPluralCategoriesError(invalidSelectors);
        }
      }
    }
  });
}

class UnknownPluralCategoriesError extends Error {
  constructor(categories) {
    super(categories.length === 1 ?
      `Unknown plural category: ${categories[0]}` :
      `Unknown plural categories: ${categories.join(', ')}`);
  }
}

class UnknownOrdinalCategoriesError extends Error {
  constructor(categories) {
    super(categories.length === 1 ?
      `Unknown ordinal category: ${categories[0]}` :
      `Unknown ordinal categories: ${categories.join(', ')}`);
  }
}

module.exports = validateMessage;
