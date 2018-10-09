/* eslint-env node */

'use strict';

const messageParser = require('@ember-intl/intl-messageformat-parser');

const pluralCategories = require('./plural-categories');
const ordinalCategories = require('./ordinal-categories');
const traverse = require('./ast-traverse');

function validateMessage(message, locale) {
  let ast = messageParser.parse(message);

  locale = locale || '';

  let language = locale.split('-')[0];
  let validPlurals = pluralCategories[language];
  let validOrdinals = ordinalCategories[language];

  traverse(ast, {
    pluralFormat: node => {
      let hasOtherSelector =
        node.options.map(it => it.selector.trim()).filter(selector => selector === 'other').length !== 0;

      if (!hasOtherSelector) {
        throw new MissingOtherSelectorError();
      }

      if (!locale) {
        return;
      }

      let validSelectors = node.ordinal ? validOrdinals : validPlurals;

      let selectors = node.options.map(it => it.selector.trim());
      let invalidSelectors = selectors.filter(selector => {
        return validSelectors.indexOf(selector) === -1 && !/=\d+/.test(selector);
      });

      if (invalidSelectors.length) {
        if (node.ordinal) {
          throw new UnknownOrdinalCategoriesError(invalidSelectors);
        } else {
          throw new UnknownPluralCategoriesError(invalidSelectors);
        }
      }
    },

    selectFormat: node => {
      let hasOtherSelector =
        node.options.map(it => it.selector.trim()).filter(selector => selector === 'other').length !== 0;

      if (!hasOtherSelector) {
        throw new MissingOtherSelectorError();
      }
    }
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
