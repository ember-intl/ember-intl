const { parse, TYPE } = require('@formatjs/icu-messageformat-parser');

const traverse = require('./ast-traverse');
const ordinalCategories = require('./ordinal-categories');
const pluralCategories = require('./plural-categories');

function validateMessage(message, locale) {
  const language = locale.split('-')[0];

  const validPlurals = pluralCategories[language];
  const validOrdinals = ordinalCategories[language];

  // Keep the options in sync with those for formatMessage()
  const ast = parse(message, {
    ignoreTag: true,
  });

  traverse(ast, {
    [TYPE.plural]: (node) => {
      const selectors = Object.keys(node.options).map((s) => s.trim());

      if (!selectors.includes('other')) {
        throw new Error('Missing selector: other');
      }

      if (!locale) {
        return;
      }

      const isOrdinal = node.pluralType === 'ordinal';
      const validSelectors = isOrdinal ? validOrdinals : validPlurals;

      const invalidSelectors = selectors.filter((selector) => {
        if (validSelectors.indexOf(selector) >= 0) {
          return false;
        }

        return !/=\d+/.test(selector);
      });

      if (invalidSelectors.length) {
        throw new Error(
          `Unknown ${isOrdinal ? 'ordinal' : 'plural'} categories: ${invalidSelectors.join(', ')}`,
        );
      }
    },

    [TYPE.select]: (node) => {
      const selectors = Object.keys(node.options).map((s) => s.trim());

      if (!selectors.includes('other')) {
        throw new Error('Missing selector: other');
      }
    },
  });
}

module.exports = validateMessage;
