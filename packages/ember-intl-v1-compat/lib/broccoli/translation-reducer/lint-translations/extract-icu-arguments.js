const { parse, TYPE } = require('@formatjs/icu-messageformat-parser');

const traverse = require('../../../message-validator/ast-traverse');

function extractIcuArguments(message) {
  const icuArguments = new Set();

  function recordArgument(node) {
    icuArguments.add(node.value);
  }

  try {
    // Keep the options for `parse()` in sync with those for `formatMessage()`
    const ast = parse(message, {
      ignoreTag: true,
    });

    traverse(ast, {
      [TYPE.argument]: recordArgument,
      [TYPE.date]: recordArgument,
      [TYPE.plural]: recordArgument,
      [TYPE.select]: recordArgument,
      [TYPE.time]: recordArgument,
    });

    return Array.from(icuArguments);
  } catch (e) {
    throw new Error(
      `An error occurred while extracting ICU arguments for '${message}' (${e.message})`,
    );
  }
}

module.exports = extractIcuArguments;
