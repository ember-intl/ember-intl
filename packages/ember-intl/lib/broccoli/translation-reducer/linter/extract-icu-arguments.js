const { parse, TYPE } = require('@formatjs/icu-messageformat-parser');

const traverse = require('../../../message-validator/ast-traverse');

function extractICUArguments(string) {
  try {
    const args = new Set();
    const recordVisitedNodeValue = (node) => args.add(node.value);

    // Keep the options in sync with those for formatMessage()
    const ast = parse(string, {
      ignoreTag: true,
    });

    // Errors thrown by the parser won't include any details about the string. By rethrowing the
    // error with the string quoted it's much easier to identify which ICU argument was invalid.
    traverse(ast, {
      [TYPE.time]: recordVisitedNodeValue,
      [TYPE.date]: recordVisitedNodeValue,
      [TYPE.plural]: recordVisitedNodeValue,
      [TYPE.select]: recordVisitedNodeValue,
      [TYPE.argument]: recordVisitedNodeValue,
    });

    return [...args];
  } catch (err) {
    throw new Error(
      `An error occurred (${err.message}) when extracting ICU arguments for '${string}'`,
    );
  }
}

module.exports = extractICUArguments;
